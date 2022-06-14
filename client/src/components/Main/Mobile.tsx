import { css } from '@emotion/react';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/reducers';
import { displayFlex, fontColor, fontWeight } from '../../styles/common';
import type { AutoCompleteConfig } from '../../types';
import filterAutoComplete from '../../utils/filterAutoComplete';
import { logger } from '../../utils/logger';

const autoListContainer = css`
  width: 100%;
  height: 55px;
  max-width: 570px;
  display: flex;
  align-items: center;
  margin-left: 10px;
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
  height: 50px;
  float: left;
  font-size: 1.18rem;
  line-height: 50px;
  margin-left: 20px;
  cursor: pointer;
`;

const mobileContainer = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
  background-color: white;
`;

const inputBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const innerInputBox = css`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 64px;
  padding-right: 20px;
`;

const logoBox = css`
  flex: 1;
  text-align: center;
  padding: 0px 18px 0 20px;
  font-size: 1.7em;
  position: relative;
  max-width: 60px;
  cursor: pointer;
  color: rgb(128, 128, 128);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    height: 50%;
    border-right: 2px solid rgb(206, 206, 206);
  }
`;

const searchInput = css`
  flex: 15;
  margin-left: 10px;
  border: inherit;
  font-size: 1.3em;
  font-weight: 600;
  vertical-align: middle;
  min-width: 50px;
  &:focus {
    outline: none;
  }
`;

const searchIcon = css`
  flex: 0.5;
  font-size: 1.3em;
  cursor: pointer;
`;

interface AutoListProps {
  el: AutoCompleteConfig;
  searchWord: string;
  themeColor: string;
}

const AutoList = ({ el, searchWord, themeColor }: AutoListProps) => {
  const router = useRouter();

  return (
    <div css={autoListContainer}>
      <button>
        <FontAwesomeIcon
          icon={faSearch}
          onMouseDown={() => {
            void router.push(`/search/${el.word}`);
          }}
        />
      </button>
      <div
        css={autoText}
        onMouseDown={() => {
          void router.push(`/search/${el.word}`);
        }}
      >
        <span id="part-search" css={[fontColor(themeColor), fontWeight(550)]}>
          {filterAutoComplete(searchWord)}
        </span>
        <span>
          {el.word.slice(filterAutoComplete(searchWord).length, el.word.length)}
        </span>
      </div>
    </div>
  );
};

interface MobileProps {
  setMobileInput: React.Dispatch<React.SetStateAction<boolean>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const Mobile = ({ setMobileInput, searchWord, setSearchWord }: MobileProps) => {
  const [autoComplete, setAutoComplete] = useState([] as AutoCompleteConfig[]);

  const { isLogin, themeColor, id } = useSelector(
    (state: RootState) => state.loginReducer,
  );

  const router = useRouter();

  const handleSeachWord = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);

    if (
      filterAutoComplete(e.target.value) !== '' &&
      e.target.value.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(e.target.value);
      const res = await axios.get<AutoCompleteConfig[]>(
        `${process.env.NEXT_PUBLIC_SERVER_API}/auto/filtered`,
        { params: { word, userId: id }, withCredentials: true },
      );
      setAutoComplete(res.data);
    }

    if (filterAutoComplete(e.target.value).replace(/(\s*)/g, '') === '') {
      setAutoComplete([]);
    }
  };

  useEffect(() => {
    if (
      filterAutoComplete(searchWord) !== '' &&
      searchWord.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(searchWord);
      axios
        .get<AutoCompleteConfig[]>(
          `${process.env.NEXT_PUBLIC_SERVER_API}/auto/filtered`,
          {
            params: { word, userId: id },
            withCredentials: true,
          },
        )
        .then((res) => {
          setAutoComplete(res.data);
        })
        .catch((error) => {
          logger.error(error);
        });
    }
  }, []);

  return (
    <>
      <div css={mobileContainer}>
        <div css={displayFlex('column')}>
          <div
            css={[
              inputBox,
              css`
                border-bottom: 1px solid ${themeColor};
              `,
            ]}
          >
            <div css={innerInputBox}>
              <div
                css={logoBox}
                onClick={() => {
                  setMobileInput(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <input
                css={searchInput}
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  void handleSeachWord(e);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    void router.push(`/search/${searchWord}`);
                  }
                }}
                autoFocus
              />
              <FontAwesomeIcon
                css={searchIcon}
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  void router.push(`/search/${searchWord}`);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {searchWord === '' && autoComplete.length === 0
            ? ''
            : autoComplete.map((el, index) => (
                <AutoList
                  key={index}
                  el={el}
                  searchWord={searchWord}
                  themeColor={themeColor}
                ></AutoList>
              ))}
        </div>
      </div>
    </>
  );
};

export default Mobile;
