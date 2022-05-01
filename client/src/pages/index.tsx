/* eslint-disable  sonarjs/cognitive-complexity */
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { useSelector } from 'react-redux';

import Login from '../components/Login/Login';
import AlertLogin from '../components/Main/AlertLogin';
import Mobile from '../components/Main/Mobile';
import Manual from '../components/Manual/Manual';
import useManual from '../hooks/useMaual';
import type { RootState } from '../redux/reducers';
import type { AutoCompleteConfig } from '../types';
import filterAutoComplete from '../utils/filterAutoComplete';
import { logger } from '../utils/logger';

interface AutoListProps {
  el: AutoCompleteConfig;
  searchWord: string;
  themeColor: string;
}

const AutoList = ({ el, searchWord, themeColor }: AutoListProps) => (
  <div className="list-auto">
    <button className="searchButton">
      <FontAwesomeIcon
        icon={faSearch}
        onMouseDown={() => {
          window.location.replace(`/search/query=${el.word}`);
        }}
      />
    </button>
    <div
      id="text-auto"
      onMouseDown={() => {
        window.location.replace(`/search/query=${el.word}`);
      }}
    >
      <span id="part-search" style={{ color: themeColor, fontWeight: '550' }}>
        {filterAutoComplete(searchWord)}
      </span>
      <span id="part-auto">
        {el.word.slice(filterAutoComplete(searchWord).length, el.word.length)}
      </span>
    </div>
  </div>
);

const Home: NextPage = () => {
  const [isPopUpOpen, setDate] = useManual();
  const notification = useRef<HTMLDivElement>(null);
  const login = useRef<HTMLDivElement>(null);
  const btnSetting = useRef<HTMLDivElement>(null);
  const btnLogin = useRef<HTMLDivElement>(null);
  const { isLogin, siteName, themeColor, id } = useSelector(
    (state: RootState) => state.loginReducer,
  );
  const [searchWord, setSearchWord] = useState('');
  const [autoComplete, setAutoComplete] = useState<AutoCompleteConfig[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (
      btnSetting.current === null ||
      notification.current === null ||
      login.current === null ||
      btnLogin.current === null
    ) {
      return;
    }

    if (
      !btnSetting.current.contains(target as Node) &&
      !notification.current.contains(target as Node)
    ) {
      setIsModalOpen(false);
    }

    if (
      !btnLogin.current.contains(target as Node) &&
      !login.current.contains(target as Node)
    ) {
      setIsOpenLogin(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const hadleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/users/logout`, '', {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const handleSeachWord = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);

    if (
      filterAutoComplete(e.target.value) !== '' &&
      e.target.value.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
        { params: { word, userId: id }, withCredentials: true },
      );
      setAutoComplete(res.data as AutoCompleteConfig[]);
    }

    if (filterAutoComplete(e.target.value).replace(/(\s*)/g, '') === '') {
      setAutoComplete([]);
    }
  };

  const moveToSearch = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      window.location.replace(`/search/query=${searchWord}`);
    }
  };

  const hadleClickSetting = () => {
    if (!isLogin) {
      setIsModalOpen(!isModalOpen);
    } else {
      void router.push('/setting');
    }
  };

  const autoCompleteList = autoComplete.map((el, index) => (
    <AutoList
      key={index}
      el={el}
      searchWord={searchWord}
      themeColor={themeColor}
    ></AutoList>
  ));

  return (
    <>
      <BrowserView>
        <div className="main-container">
          <div className="navBar-container">
            {!isLogin ? (
              <div
                className="btn-login"
                ref={btnLogin}
                onClick={() => {
                  setIsOpenLogin(true);
                }}
              >
                로그인
              </div>
            ) : (
              <div className="btn-logout" onClick={hadleLogout}>
                로그아웃
              </div>
            )}
            <div
              className={isModalOpen ? 'box-setting on' : 'box-setting'}
              onClick={hadleClickSetting}
              ref={btnSetting}
            >
              <FontAwesomeIcon className="btn-setting" icon={faCog} />
            </div>
            <AlertLogin el={notification} modal={isModalOpen} />
          </div>
          <div className="searchForm-container">
            <div
              className="logo"
              style={{ color: themeColor }}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              {siteName}
            </div>
            <div className="search-box hidden">
              <div
                className={
                  isOnFocus ? 'search-box-auto focus' : 'search-box-auto'
                }
                style={{ border: `2px solid ${themeColor}` }}
              >
                <div
                  className={
                    searchWord === '' || autoComplete.length === 0 || !isOnFocus
                      ? 'search-box-inner'
                      : 'search-box-inner border'
                  }
                >
                  <button
                    className="searchButton"
                    onClick={() => {
                      window.location.replace(`/search/query=${searchWord}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    className="search"
                    onChange={void handleSeachWord}
                    onFocus={() => {
                      setIsOnFocus(true);
                    }}
                    onBlur={() => {
                      setIsOnFocus(false);
                    }}
                    onKeyPress={void moveToSearch}
                  ></input>
                </div>
                {searchWord === '' && autoComplete.length === 0
                  ? ''
                  : isOnFocus && autoCompleteList}
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileOnlyView>
        <div className={isMobile ? 'main-container-none' : 'main-container'}>
          <div className="navBar-container">
            {!isLogin ? (
              <div
                className="btn-login"
                ref={btnLogin}
                onClick={() => {
                  setIsOpenLogin(true);
                }}
              >
                로그인
              </div>
            ) : (
              <div className="btn-logout" onClick={hadleLogout}>
                로그아웃
              </div>
            )}
            <div
              className={isModalOpen ? 'box-setting on' : 'box-setting'}
              onClick={hadleClickSetting}
              ref={btnSetting}
            >
              <FontAwesomeIcon className="btn-setting" icon={faCog} />
            </div>
            <AlertLogin el={notification} modal={isModalOpen} />
          </div>
          <div className="searchForm-container">
            <div
              className="logo"
              style={{ color: themeColor }}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              {siteName}
            </div>
            <div className="search-box hidden">
              <div
                className={
                  isOnFocus ? 'search-box-auto focus' : 'search-box-auto'
                }
                style={{ border: `2px solid ${themeColor}` }}
              >
                <div
                  className={
                    searchWord === '' || autoComplete.length === 0 || !isOnFocus
                      ? 'search-box-inner'
                      : 'search-box-inner border'
                  }
                >
                  <button
                    className="searchButton"
                    onClick={() => {
                      window.location.replace(`/search/query=${searchWord}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    className="search"
                    value={searchWord}
                    onChange={void handleSeachWord}
                    onFocus={() => {
                      setIsOnFocus(true);
                      setIsMobile(true);
                    }}
                    onBlur={() => {
                      setIsOnFocus(false);
                    }}
                    onKeyPress={void moveToSearch}
                  ></input>
                </div>
                {searchWord === '' && autoComplete.length === 0
                  ? ''
                  : isOnFocus && autoCompleteList}
              </div>
            </div>
          </div>
        </div>
        {isMobile && (
          <Mobile
            setMobileInput={setIsMobile}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
        )}
      </MobileOnlyView>

      <Login login={login} loginModal={isOpenLogin} />
      <BrowserView>
        {isPopUpOpen && <Manual setDate={setDate as () => void} />}
      </BrowserView>
    </>
  );
};

export default Home;
