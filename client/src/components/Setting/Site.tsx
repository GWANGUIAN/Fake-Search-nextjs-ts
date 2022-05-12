import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Color from '../../items/Color';
import { login } from '../../redux/actions';
import type { RootState } from '../../redux/reducers';
import checkSiteName from '../../utils/checkSiteName';
import { logger } from '../../utils/logger';

const Site = () => {
  const dispatch = useDispatch();
  const { themeColor, siteName } = useSelector(
    (state: RootState) => state.loginReducer,
  );
  const [siteNameForm, setNicknameForm] = useState('');
  const colorBtnRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (colorRef.current === null || colorBtnRef.current === null) {
      return;
    }

    if (
      !colorRef.current.contains(target as Node) &&
      !colorBtnRef.current.contains(target as Node)
    ) {
      setIsColorOpen(false);
    }
  };

  const handleSiteName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameForm(e.target.value);

    if (e.target.value === '') {
      setIsChecked(true);
    } else {
      setIsChecked(checkSiteName(e.target.value));
    }
  };

  const changeSiteName = () => {
    if (isChecked && siteNameForm !== '') {
      void axios
        .patch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/users/site-name`,
          {
            siteName: siteNameForm,
          },
          { withCredentials: true },
        )
        .then(() => {
          dispatch(login({ siteName: siteNameForm }));
          setNicknameForm('');
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              const htmlTitle = document.querySelector('title');

              if (htmlTitle) {
                htmlTitle.innerHTML = res.data.siteName;
              }
            })
            .catch((error) => {
              logger.error(error);
            });
        });
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="site-container">
      <div className="box-sitename">
        <div className="title-sitename">사이트 이름</div>
        <div className="box-input">
          <input
            type="text"
            id="input-name"
            value={siteNameForm}
            placeholder={siteName}
            onChange={handleSiteName}
          />
          <button
            id={
              isChecked && siteNameForm !== ''
                ? 'btn-submit'
                : 'btn-submit-none'
            }
            style={{
              backgroundColor:
                isChecked && siteNameForm !== ''
                  ? themeColor
                  : 'rgb(190, 190, 190)',
            }}
            onClick={changeSiteName}
          >
            변경하기
          </button>
        </div>
        <div className={isChecked ? 'text-alert-hidden' : 'text-alert'}>
          사이트 이름은 특수문자, 공백, 숫자를 제외한 2~10자만 사용 가능합니다.
          <br />
          (구글, 네이버 등 포털 사이트 도메인 사용불가)
        </div>
      </div>
      <div className="box-theme">
        <div className="title-theme">테마 색상</div>
        <div className="info-color" ref={colorBtnRef}>
          <div
            id="sample-color"
            style={{ backgroundColor: themeColor }}
            onClick={() => {
              setIsColorOpen(!isColorOpen);
            }}
          />
          <div
            id="text-color"
            onClick={() => {
              setIsColorOpen(!isColorOpen);
            }}
          >
            {themeColor}
          </div>
        </div>
        <Color colorRef={colorRef} isColorOpen={isColorOpen} />
      </div>
    </div>
  );
};

export default Site;
