import { css } from '@emotion/react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { hidden, margin } from '../../styles/global';
import type { AutoCompleteConfig } from '../../types';
import checkAutoComplete from '../../utils/checkAutoComplete';
import { logger } from '../../utils/logger';

const autoCompleteContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 80px 80px 80px;
  box-sizing: border-box;
  @media (max-width: 680px) {
    padding: 10px 30px;
  }
`;

const autoInputBox = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2.5px solid rgb(116, 116, 116);
  margin-top: 2%;
`;

const autoListBox = css`
  flex: 3;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 680px) {
    max-height: 66vh;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(214, 214, 214);
    border-radius: 10px;
  }
`;

const inputBox = css`
  display: flex;
  margin-top: 3%;
  height: 38px;
  align-items: center;
`;

const autoInput = css`
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

const addButton = (isActive: boolean, bgColor: string) => css`
  border: inherit;
  outline: inherit;
  ${isActive && 'cursor: pointer;'}
  width: 70px;
  height: 90%;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 1.05em;
  font-weight: 500;
  background-color: ${isActive ? bgColor : 'rgb(190, 190, 190)'};
`;

const alertTextStyle = css`
  margin-top: 7px;
  font-size: 0.9em;
  color: rgb(231, 92, 92);
`;

const autoCompleteElBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(202, 202, 202);
  min-height: 70px;
`;

const deleteButton = css`
  margin-right: 20px;
  display: flex;
  align-items: center;
  color: rgb(87, 87, 87);
  cursor: pointer;
`;

interface PropsOfEl {
  el: AutoCompleteConfig;
  deleteAutoComplete: (id: number) => void;
}

const ElOfAutoComplete = ({ el, deleteAutoComplete }: PropsOfEl) => (
  <div css={autoCompleteElBox}>
    <div css={margin(0, 0, 20, 0)}>{el.word}</div>
    <div
      css={deleteButton}
      onClick={() => {
        deleteAutoComplete(el.id);
      }}
    >
      <FontAwesomeIcon icon={faMinusCircle} />
      <div css={margin(0, 0, 5, 0)}>삭제</div>
    </div>
  </div>
);

interface Props {
  themeColor: string;
}

const AutoComplete = ({ themeColor }: Props) => {
  const [autoCompleteList, setAutoCompleteList] = useState<
    AutoCompleteConfig[]
  >([]);
  const [autoCompleteWord, setAutoCompleteWord] = useState('');
  const [alertText, setAlertText] = useState(
    '자동완성 검색어는 최대 16자까지 가능합니다. (자음,모음 불가)',
  );
  const [isChecked, setIsChecked] = useState(true);

  const getAutoComplete = useCallback(() => {
    void axios
      .get<AutoCompleteConfig[]>(`${process.env.NEXT_PUBLIC_SERVER_API}/auto`, {
        withCredentials: true,
      })
      .then((res) => {
        setAutoCompleteList(res.data);
      });
  }, [setAutoCompleteList]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCompleteWord(e.target.value);
    setAlertText(
      '자동완성 검색어는 최대 16자까지 가능합니다. (자음,모음 불가)',
    );

    if (e.target.value === '') {
      setIsChecked(true);
    } else {
      setIsChecked(checkAutoComplete(e.target.value));
    }
  };

  const addAutoComplete = async () => {
    if (autoCompleteWord !== '' && isChecked) {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/auto`,
        { word: autoCompleteWord },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        setAlertText('이미 등록된 단어입니다.');
        setIsChecked(false);
      } else if (res.status === 201) {
        setAutoCompleteWord('');
        await axios
          .get<AutoCompleteConfig[]>(
            `${process.env.REACT_APP_SERVER_API}/auto`,
            {
              withCredentials: true,
            },
          )
          .then((response) => {
            setAutoCompleteList(response.data);
          });
      }
    }
  };

  const deleteAutoComplete = (id: number) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_API}/auto`, {
        data: { id },
        withCredentials: true,
      })
      .then(() => {
        void axios
          .get<AutoCompleteConfig[]>(
            `${process.env.REACT_APP_SERVER_API}/auto`,
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            setAutoCompleteList(res.data);
          });
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  useEffect(() => {
    getAutoComplete();
  }, [getAutoComplete]);

  return (
    <div css={autoCompleteContainer}>
      <div css={autoInputBox}>
        <div>자동완성 검색어</div>
        <div css={inputBox}>
          <input
            type="text"
            css={autoInput}
            value={autoCompleteWord}
            onChange={handleCheck}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void addAutoComplete();
              }
            }}
          />
          <button
            css={addButton(isChecked && autoCompleteWord !== '', themeColor)}
            onClick={void addAutoComplete}
          >
            추가
          </button>
        </div>
        <div css={isChecked ? hidden : alertTextStyle}>{alertText}</div>
      </div>
      <div css={autoListBox}>
        {autoCompleteList.map((el, id) => (
          <ElOfAutoComplete
            key={id}
            el={el}
            deleteAutoComplete={deleteAutoComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
