import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/reducers';
import type { AutoCompleteConfig } from '../../types';
import filterAutoComplete from '../../utils/filterAutoComplete';
import { logger } from '../../utils/logger';

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

  const handleSeachWord = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);

    if (
      filterAutoComplete(e.target.value) !== '' &&
      e.target.value.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(e.target.value);
      const res = await axios.get<AutoCompleteConfig[]>(
        `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
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
          `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
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
      <div className="mobile-container">
        <div className="box-menu">
          <div
            className="box-input"
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div className="inner-box-input">
              <div
                className="box-logo"
                onClick={() => {
                  setMobileInput(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <input
                className="input-search"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  void handleSeachWord(e);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.replace(`/search/query=${searchWord}`);
                  }
                }}
                autoFocus
              />
              <FontAwesomeIcon
                className="icon-search"
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  window.location.replace(`/search/query=${searchWord}`);
                }}
              />
            </div>
          </div>
        </div>
        <div className="box-auto">
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
