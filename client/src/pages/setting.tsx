import { css } from '@emotion/react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import AutoComplete from '../components/Setting/AutoComplete';
import SearchData from '../components/Setting/SearchData';
import Site from '../components/Setting/Site';
import Withdrawal from '../components/Setting/Withdrawal';
import type { RootState } from '../redux/reducers';
import type { SelectMenuOption } from '../types';
import { logger } from '../utils/logger';

const settingContainer = (bgColor: string) => css`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-color: ${bgColor + '35'};
  @media (min-width: 601px) {
    height: 100vh;
  }
  @media (max-width: 600px) {
    min-height: 100vh;
  }
  @media (max-width: 1122px) {
    flex-direction: column;
  }
`;

const menuBox = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 3% 1% 3% 3%;
  padding: 35px;
  background-color: white;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  @media (max-width: 1122px) {
    display: none;
  }
`;

const contentBox = css`
  display: flex;
  flex-direction: column;
  flex: 3.1;
  margin: 3% 3% 3% 1%;
  background-color: white;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgb(187, 187, 187);
  overflow: hidden;
  position: relative;
  @media (max-width: 1122px) {
    margin: 1% 2% 2% 2%;
  }
`;

const mobileMenuBox = css`
  display: flex;
  align-items: center;
  flex: 0.03;
  margin: 2% 2% 1% 2%;
  padding: 25px;
  background-color: white;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgb(187, 187, 187);
  @media (min-width: 1123px) {
    display: none;
  }
`;

const backButton = css`
  display: flex;
  align-items: center;
  color: rgb(124, 124, 124);
  font-weight: 500;
  margin-bottom: 10%;
`;

const backIcon = css`
  margin-right: 15px;
  cursor: pointer;
  @media (max-width: 1122px) {
    font-size: 1.3em;
  }
`;

const menuStyle = (selected: boolean, themeColor: string) => css`
  font-size: 1.07em;
  margin: 5px 0;
  cursor: pointer;
  border-left: ${selected && `5px solid ${themeColor}`};
  padding-left: ${selected ? '10px' : '15px'};
  font-weight: ${selected && 600};
`;

const withdrawalButton = css`
  margin-top: auto;
  text-align: right;
  color: rgb(158, 158, 158);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const selectMenu = css`
  @media (max-width: 1122px) {
    width: 100%;
  }
`;

const Setting = () => {
  const router = useRouter();
  const { themeColor, siteName, oauth } = useSelector(
    (state: RootState) => state.loginReducer,
  );
  const [tabMenu, setTabMenu] = useState(0);
  const [isOpenWithdrawal, setIsOpenWithdrawal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<SelectMenuOption>({
    value: 0,
    label: '사이트 이름 및 테마 색상 설정',
  });

  const menuList: SelectMenuOption[] = [
    { value: 0, label: '사이트 이름 및 테마 색상 설정' },
    { value: 1, label: '자동완성 검색어 설정' },
    { value: 2, label: '검색 페이지 설정' },
  ];

  const selectSetting = (e: SelectMenuOption) => {
    setSelected(e);
    setTabMenu(e.value);
  };

  const isAuthenticated = useCallback(async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data) {
          window.location.replace('/');
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        logger.log(error);
        window.location.replace('/');
      });
  }, []);

  useEffect(() => {
    void isAuthenticated();
  }, [isAuthenticated]);

  return (
    <>
      {!isLoading && (
        <div css={settingContainer(themeColor)}>
          <div css={menuBox}>
            <div css={backButton}>
              <FontAwesomeIcon
                css={backIcon}
                icon={faArrowLeft}
                onClick={() => {
                  void router.back();
                }}
              />
              <div
                id="text-back"
                onClick={() => {
                  void router.back();
                }}
              >
                돌아가기
              </div>
            </div>
            <div
              css={menuStyle(tabMenu === 0, themeColor)}
              onClick={() => {
                setTabMenu(0);
                setSelected(menuList[0]);
              }}
            >
              사이트 이름 및 테마 색상 설정
            </div>
            <div
              css={menuStyle(tabMenu === 1, themeColor)}
              onClick={() => {
                setTabMenu(1);
                setSelected(menuList[1]);
              }}
            >
              자동완성 검색어 설정
            </div>
            <div
              css={menuStyle(tabMenu === 2, themeColor)}
              onClick={() => {
                setTabMenu(2);
                setSelected(menuList[2]);
              }}
            >
              검색 페이지 설정
            </div>
            {oauth !== 'guest' && (
              <div
                css={withdrawalButton}
                onClick={() => {
                  setIsOpenWithdrawal(true);
                }}
              >
                회원탈퇴
              </div>
            )}
          </div>
          <div css={mobileMenuBox}>
            <FontAwesomeIcon
              css={backIcon}
              icon={faArrowLeft}
              onClick={() => {
                void router.back();
              }}
            />
            <Select
              css={selectMenu}
              options={menuList}
              onChange={(e) => void selectSetting(e!)}
              value={selected}
            />
          </div>
          <div css={contentBox}>
            {tabMenu === 0 ? (
              <Site />
            ) : tabMenu === 1 ? (
              <AutoComplete themeColor={themeColor} />
            ) : (
              <SearchData themeColor={themeColor} siteName={siteName} />
            )}
          </div>
          {isOpenWithdrawal && (
            <Withdrawal setConfirmWithdrawal={setIsOpenWithdrawal} />
          )}
        </div>
      )}
    </>
  );
};

export default Setting;
