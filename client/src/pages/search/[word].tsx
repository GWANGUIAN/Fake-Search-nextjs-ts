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
import type { SearchDataConfig } from '../../types';
import type {
  ImageState,
  MusicState,
  NewsState,
  ProfileState,
} from '../../types/state';
import changeDomain from '../../utils/changeDomain';

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
      `${process.env.REACT_APP_SERVER_API}/search/word`,
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
      <div className="search-container">
        <div className="box-menu">
          <div
            className="box-input"
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div className="inner-box-input">
              <div
                className="box-logo"
                style={{ color: themeColor }}
                onClick={() => {
                  window.location.replace('/');
                }}
              >
                {changeDomain(siteName)}
              </div>
              <input
                className="input-search"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.replace(`/search/query=${searchWord}`);
                  }
                }}
              />
              <FontAwesomeIcon
                className="icon-search"
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  window.location.replace(`/search/query=${searchWord}`);
                }}
              />
              <div
                className={isOpenModal ? 'box-setting on' : 'box-setting'}
                onClick={() => {
                  if (!isLogin) {
                    setIsOpenModal(!isOpenModal);
                  } else {
                    void router.push('/setting');
                  }
                }}
                ref={btnSetting}
              >
                <FontAwesomeIcon className="icon-setting" icon={faCog} />
              </div>

              <AlertLogin el={notification} modal={isOpenModal} />
            </div>
          </div>
          <div className="box-category">
            <div className="inner-box-category">
              <div
                className="text-categories all"
                style={{ color: themeColor }}
              >
                통합
              </div>
              <div className="text-categories view">블로그</div>
              <div className="text-categories image">이미지</div>
              <div className="text-categories video">동영상</div>
              <div className="text-categories shopping">쇼핑</div>
              <div className="text-categories news">뉴스</div>
              <div className="text-categories dictionary">어학사전</div>
              <div className="text-categories map">지도</div>
              <div className="text-categories more">더보기</div>
            </div>
          </div>
        </div>
        <div className="box-content">
          <div className="inner-box-content">
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
