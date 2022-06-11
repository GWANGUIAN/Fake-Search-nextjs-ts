import { css } from '@emotion/react';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import AlertLogin from '../../components/Main/AlertLogin';
import Footer from '../../components/Search/Footer';
import NotFound from '../../components/Search/NotFound';
import type { RootState } from '../../redux/reducers';
import {
  categoryBox,
  categoryText,
  contentBox,
  flexColumn,
  fontColor,
  inputBox,
  inputInnerBox,
  logoBox,
  minWidth,
  mobileCategoryNone,
  searchIcon,
  searchInput,
  settingBox,
  settingIcon,
} from '../../styles/common';
import changeDomain from '../../utils/changeDomain';

const searchContainer = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
`;

const settingBoxOn = css`
  background-color: rgb(226, 226, 226);
  min-width: 30px;
`;

const Search = () => {
  const router = useRouter();
  const { word } = router.query;

  const notification = useRef<HTMLDivElement>(null);
  const btnSetting = useRef<HTMLDivElement>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchWord, setSearchWord] = useState(word);

  const { isLogin, siteName, themeColor } = useSelector(
    (state: RootState) => state.loginReducer,
  );

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (btnSetting.current === null || notification.current === null) {
      return;
    }

    if (
      !btnSetting.current.contains(target as Node) &&
      !notification.current.contains(target as Node)
    ) {
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div css={searchContainer}>
        <div css={[flexColumn]}>
          <div css={inputBox(themeColor)}>
            <div css={inputInnerBox}>
              <div
                css={[logoBox, fontColor(themeColor)]}
                onClick={() => {
                  void router.replace('/');
                }}
              >
                {changeDomain(siteName)}
              </div>
              <input
                css={searchInput}
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    void router.replace(`/search/${searchWord}`);
                  }
                }}
              />
              <FontAwesomeIcon
                css={searchIcon}
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  void router.replace(`/search/${searchWord}`);
                }}
              />
              <div
                css={[settingBox, isOpenModal && settingBoxOn]}
                onClick={() => {
                  if (!isLogin) {
                    setIsOpenModal(!isOpenModal);
                  } else {
                    void router.push('/setting');
                  }
                }}
                ref={btnSetting}
              >
                <FontAwesomeIcon css={settingIcon} icon={faCog} />
              </div>

              <AlertLogin el={notification} modal={isOpenModal} />
            </div>
          </div>
          <div css={categoryBox}>
            <div>
              <div css={[categoryText, minWidth(40), fontColor(themeColor)]}>
                통합
              </div>
              <div css={[categoryText, minWidth(45)]}>블로그</div>
              <div css={[categoryText, minWidth(45)]}>이미지</div>
              <div css={[categoryText, minWidth(45)]}>동영상</div>
              <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
                쇼핑
              </div>
              <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
                뉴스
              </div>
              <div css={[categoryText, minWidth(60), mobileCategoryNone]}>
                어학사전
              </div>
              <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
                지도
              </div>
              <div
                css={[
                  categoryText,
                  minWidth(45),
                  fontColor('rgb(149, 149, 149)'),
                ]}
              >
                더보기
              </div>
            </div>
          </div>
        </div>
        <div css={contentBox}>
          <div>
            <NotFound word={''} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
