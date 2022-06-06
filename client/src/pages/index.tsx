/* eslint-disable  sonarjs/cognitive-complexity */
import { css } from '@emotion/react';
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
import type { RootState } from '../redux/reducers';
import {
  background,
  displayNone,
  fontColor,
  fontWeight,
} from '../styles/global';
import type { AutoCompleteConfig } from '../types';
import filterAutoComplete from '../utils/filterAutoComplete';
import { logger } from '../utils/logger';

const autoListContainer = css`
  width: 100%;
  height: 50px;
  max-width: 570px;
  display: flex;
  align-items: center;
  button {
    background-color: inherit;
    border: none;
    margin-left: 15px;
    font-size: 1em;
    color: rgb(158, 158, 158);
    cursor: pointer;
  }
`;

const autoText = css`
  padding: 0;
  width: 88%;
  height: 40px;
  float: left;
  font-size: 1.18rem;
  line-height: 40px;
  margin-left: 10px;
  cursor: pointer;
`;

const mainContainer = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const navContainer = css`
  width: 97%;
  flex: 0.1;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: right;
  position: relative;
`;

const loginBtn = css`
  margin: 0 10px 0 auto;
  color: rgb(53, 53, 53);
  font-size: 1.1em;
  cursor: pointer;
`;

const settingBtn = css`
  margin: 0 10px 0 10px;
  color: rgb(85, 85, 85);
  font-size: 1.1em;
  cursor: pointer;
`;

const settingModal = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const searchFormContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 8%;
  @media (max-width: 768px) {
    padding-bottom: 35%;
  }
`;

const logo = css`
  font-family: 'Noto Sans KR';
  font-size: 3.5em;
  margin-bottom: 1%;
  cursor: pointer;
  @media (max-width: 650px) {
    font-size: 2.3em;
  }
`;

const hiddenSearchBox = css`
  width: 95%;
  height: 10vw;
  max-height: 50px;
  max-width: 570px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #2260ff;
  border-radius: 50px;
  position: relative;
  visibility: hidden;
  @media (max-width: 650px) {
    width: 75%;
    max-height: 40px;
  }
`;

const autoSearchBox = css`
  visibility: visible;
  width: 100%;
  max-width: 570px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  top: -2px;
  left: -2px;
  &:hover {
    box-shadow: 0px 2px 3px rgb(187, 187, 187);
  }
  @media (max-width: 650px) {
    min-height: 40px;
  }
`;

const onFocusSearchBox = css`
  box-shadow: 0px 2px 3px rgb(187, 187, 187);
`;

const themeBorder = (color: string) => css`
  border: 2px solid ${color};
`;

const innerSearchBox = css`
  width: 100%;
  height: 50px;
  max-width: 570px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const innerSearchBoxBorder = css`
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 0;
    height: 1px;
    width: 95%; /* or 100px */
    border-bottom: 1px solid rgb(190, 190, 190);
  }
`;

const searchButton = css`
  background-color: inherit;
  border: none;
  margin-left: 15px;
  font-size: 1em;
  color: rgb(158, 158, 158);
  cursor: pointer;
`;

const searchInput = css`
  padding: 0;
  width: 88%;
  height: 7vh;
  max-height: 40px;
  border: none;
  background: none;
  outline: none;
  float: left;
  font-size: 1.2rem;
  line-height: 20px;
  margin-right: 15px;
`;

interface AutoListProps {
  el: AutoCompleteConfig;
  searchWord: string;
  themeColor: string;
}

const AutoList = ({ el, searchWord, themeColor }: AutoListProps) => (
  <div css={autoListContainer}>
    <button>
      <FontAwesomeIcon
        icon={faSearch}
        onMouseDown={() => {
          window.location.replace(`/search/query=${el.word}`);
        }}
      />
    </button>
    <div
      css={autoText}
      onMouseDown={() => {
        window.location.replace(`/search/query=${el.word}`);
      }}
    >
      <span css={[fontColor(themeColor), fontWeight(550)]}>
        {filterAutoComplete(searchWord)}
      </span>
      <span>
        {el.word.slice(filterAutoComplete(searchWord).length, el.word.length)}
      </span>
    </div>
  </div>
);

const Home: NextPage = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
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
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/users/logout`, '', {
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

  const setDate = () => {
    localStorage.setItem(
      'manualPopUpDate',
      String(new Date(new Date().setDate(new Date().getDate() + 7))),
    );
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    const localDate =
      localStorage.getItem('manualPopUpDate') || String(new Date());
    const lastDate = Date.parse(localDate);
    const NowDate = Date.parse(String(new Date()));
    setIsPopUpOpen(lastDate <= NowDate);
  }, []);

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
        <div css={mainContainer}>
          <div css={navContainer}>
            {!isLogin ? (
              <div
                css={loginBtn}
                ref={btnLogin}
                onClick={() => {
                  setIsOpenLogin(true);
                }}
              >
                로그인
              </div>
            ) : (
              <div css={loginBtn} onClick={hadleLogout}>
                로그아웃
              </div>
            )}
            <div
              css={
                isModalOpen
                  ? [settingModal, background('rgb(207, 207, 207)')]
                  : settingModal
              }
              onClick={hadleClickSetting}
              ref={btnSetting}
            >
              <FontAwesomeIcon css={settingBtn} icon={faCog} />
            </div>
            <AlertLogin el={notification} modal={isModalOpen} />
          </div>
          <div css={searchFormContainer}>
            <div
              css={[logo, fontColor(themeColor)]}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              {siteName}
            </div>
            <div css={hiddenSearchBox}>
              <div
                css={
                  isOnFocus
                    ? [autoSearchBox, onFocusSearchBox, themeBorder(themeColor)]
                    : [autoSearchBox, themeBorder(themeColor)]
                }
              >
                <div
                  css={
                    searchWord === '' || autoComplete.length === 0 || !isOnFocus
                      ? innerSearchBox
                      : [innerSearchBox, innerSearchBoxBorder]
                  }
                >
                  <button
                    css={searchButton}
                    onClick={() => {
                      window.location.replace(`/search/query=${searchWord}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    css={searchInput}
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
        <div css={isMobile ? displayNone : mainContainer}>
          <div css={navContainer}>
            {!isLogin ? (
              <div
                css={loginBtn}
                ref={btnLogin}
                onClick={() => {
                  setIsOpenLogin(true);
                }}
              >
                로그인
              </div>
            ) : (
              <div css={loginBtn} onClick={hadleLogout}>
                로그아웃
              </div>
            )}
            <div
              css={
                isModalOpen
                  ? [settingModal, background('rgb(207, 207, 207)')]
                  : settingModal
              }
              onClick={hadleClickSetting}
              ref={btnSetting}
            >
              <FontAwesomeIcon css={settingBtn} icon={faCog} />
            </div>
            <AlertLogin el={notification} modal={isModalOpen} />
          </div>
          <div css={searchFormContainer}>
            <div
              css={[logo, fontColor(themeColor)]}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              {siteName}
            </div>
            <div css={hiddenSearchBox}>
              <div
                css={
                  isOnFocus
                    ? [autoSearchBox, onFocusSearchBox, themeBorder(themeColor)]
                    : [autoSearchBox, themeBorder(themeColor)]
                }
              >
                <div
                  css={
                    searchWord === '' || autoComplete.length === 0 || !isOnFocus
                      ? innerSearchBox
                      : [innerSearchBox, innerSearchBoxBorder]
                  }
                >
                  <button
                    css={searchButton}
                    onClick={() => {
                      window.location.replace(`/search/query=${searchWord}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    css={searchInput}
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
      <BrowserView>{isPopUpOpen && <Manual setDate={setDate} />}</BrowserView>
    </>
  );
};

export default Home;
