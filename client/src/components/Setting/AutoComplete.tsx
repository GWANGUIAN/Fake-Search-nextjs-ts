import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import checkAutoComplete from '../../utils/checkAutoComplete';

interface Props {
  themeColor: string;
}

export default function AutoComplete({ themeColor }: Props) {
  const [autoCompleteList, setAutoCompleteList] = useState([]);
  const [autoCompleteWord, setAutoCompleteWord] = useState('');
  const [alertText, setAlertText] = useState(
    '자동완성 검색어는 최대 16자까지 가능합니다. (자음,모음 불가)',
  );
  const [isChecked, setIsChecked] = useState(true);

  const getAutoComplete = useCallback(() => {
    void axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/auto`, {
        withCredentials: true,
      })
      .then((res) => {
        setAutoCompleteList(res.data);
      });
  }, [setAutoCompleteList]);

  const handleCheck = (e) => {
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
        await setAlertText('이미 등록된 단어입니다.');
        await setIsChecked(false);
      } else if (res.status === 201) {
        await setAutoCompleteWord('');
        await axios
          .get(`${process.env.REACT_APP_SERVER_API}/auto`, {
            withCredentials: true,
          })
          .then((res) => {
            setAutoCompleteList(res.data);
          });
      }
    }
  };

  const deleteAutoComplete = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_API}/auto`, {
        data: { id },
        withCredentials: true,
      })
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_API}/auto`, {
            withCredentials: true,
          })
          .then((res) => {
            setAutoCompleteList(res.data);
          });
      });
  };

  useEffect(() => {
    getAutoComplete();
  }, [getAutoComplete]);

  return (
    <div className="autocomplete-container">
      <div className="box-auto-input">
        <div className="title-auto">자동완성 검색어</div>
        <div className="box-input">
          <input
            type="text"
            id="input-auto"
            value={autoCompleteWord}
            onChange={handleCheck}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addAutoComplete();
              }
            }}
          />
          <button
            id={
              isChecked && autoCompleteWord !== '' ? 'btn-add' : 'btn-add-none'
            }
            style={{
              backgroundColor:
                isChecked && autoCompleteWord !== ''
                  ? themeColor
                  : 'rgb(190, 190, 190)',
            }}
            onClick={addAutoComplete}
          >
            추가
          </button>
        </div>
        <div className={isChecked ? 'text-alert-hidden' : 'text-alert'}>
          {alertText}
        </div>
      </div>
      <div className="box-auto-list">
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
}

function ElOfAutoComplete({ el, deleteAutoComplete }) {
  return (
    <div className="box-el">
      <div className="text-auto">{el.word}</div>
      <div
        className="btn-delete"
        onClick={() => {
          deleteAutoComplete(el.id);
        }}
      >
        <FontAwesomeIcon icon={faMinusCircle} />
        <div className="text-delete">삭제</div>
      </div>
    </div>
  );
}
