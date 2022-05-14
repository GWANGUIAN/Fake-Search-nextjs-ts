import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Color from '../../items/Color';
import { login } from '../../redux/actions';
import type { RootState } from '../../redux/reducers';
import {
  flexNum,
  fontWeight,
  hidden,
  marginPercent,
  pointer,
} from '../../styles/global';
import checkSiteName from '../../utils/checkSiteName';
import { logger } from '../../utils/logger';

const siteContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 80px;
  box-sizing: border-box;
  @media (max-width: 680px) {
    padding: 10px 30px;
  }
`;

const siteNameBox = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-top: 3%;
  margin-bottom: 5%;
`;

const inputBox = css`
  display: flex;
  margin-top: 3%;
  height: 38px;
  align-items: center;
`;

const nameInput = css`
  margin-right: 15px;
  width: 100%;
  height: 100%;
  max-width: 250px;
  font-size: 1.2em;
  color: rgb(82, 82, 82);
  font-family: 'Noto Sans KR';
  border: 2px solid rgb(156, 156, 156);
  &:focus {
    outline: inherit;
  }
`;

const submitButton = (isActive: boolean, bgColor: string) => css`
  border: inherit;
  outline: inherit;
  cursor: pointer;
  min-width: 80px;
  height: 90%;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  ${!isActive && 'width: 90px;'}
  background-color: ${isActive ? bgColor : 'rgb(190, 190, 190)'};
  &:hover {
    background-color: inherit;
  }
`;

const alertText = css`
  margin-top: 7px;
  font-size: 0.9em;
  color: rgb(231, 92, 92);
`;

const colorInfo = css`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`;

const colorSample = css`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 20px;
`;

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
      axios
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
        })
        .catch((error) => {
          logger.error(error);
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
    <div css={siteContainer}>
      <div css={siteNameBox}>
        <div>사이트 이름</div>
        <div css={inputBox}>
          <input
            type="text"
            css={nameInput}
            value={siteNameForm}
            placeholder={siteName}
            onChange={handleSiteName}
          />
          <button
            css={submitButton(
              isChecked && siteNameForm !== '',
              themeColor as string,
            )}
            onClick={changeSiteName}
          >
            변경하기
          </button>
        </div>
        <div css={isChecked ? hidden : alertText}>
          사이트 이름은 특수문자, 공백, 숫자를 제외한 2~10자만 사용 가능합니다.
          <br />
          (구글, 네이버 등 포털 사이트 도메인 사용불가)
        </div>
      </div>
      <div css={flexNum(3)}>
        <div css={marginPercent(0, 3, 0, 0)}>테마 색상</div>
        <div css={colorInfo} ref={colorBtnRef}>
          <div
            css={colorSample}
            style={{ backgroundColor: themeColor }}
            onClick={() => {
              setIsColorOpen(!isColorOpen);
            }}
          />
          <div
            css={[fontWeight(600), pointer]}
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
