import { css } from '@emotion/react';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import AlertLogin from '../../components/Main/AlertLogin';
import Footer from '../../components/Search/Footer';
import Images from '../../components/Search/Images';
import Music from '../../components/Search/Music';
import News from '../../components/Search/News';
import NotFound from '../../components/Search/NotFound';
import Profile from '../../components/Search/Profile';
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
import type { SearchDataConfig } from '../../types';
import type {
  ImageState,
  MusicState,
  NewsState,
  ProfileState,
} from '../../types/state';
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
  const [searchData, setSearchData] = useState<
    Array<ProfileState | NewsState | ImageState | MusicState>
  >([]);
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

  const getSearchData = useCallback(async () => {
    const res = await axios.get<SearchDataConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/search/word`,
      {
        params: { word },
        withCredentials: true,
      },
    );

    if (res.data.id) {
      setSearchData([
        res.data.profile,
        res.data.news,
        res.data.image,
        res.data.music,
      ]);
    }
  }, [setSearchData, word]);

  useEffect(() => {
    void getSearchData();
  }, [getSearchData]);

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
            {searchData
              .sort((a, b) => a.order - b.order)
              .map((el, id) => {
                if (el.type === 'profile' && el.view) {
                  return <Profile key={id} profileData={el} />;
                } else if (el.type === 'news' && el.view) {
                  return <News key={id} newsData={el} />;
                } else if (el.type === 'image' && el.view) {
                  return <Images key={id} imageData={el.content} />;
                } else if (el.type === 'music' && el.view) {
                  return <Music key={id} musicData={el} />;
                }

                return '';
              })}
            {(searchData.length === 0 ||
              searchData.every((el) => !el.view)) && (
              <NotFound word={word as string} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
