import { css } from '@emotion/react';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeNews, resetNews } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import {
  alignItems,
  flex,
  flexColumn,
  flexNum,
  sectionDeleteBtn,
  sectionOpenBtn,
  sectionTitle,
} from '../styles/common';
import type { NewsContentConfiguration } from '../types/state';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

const newsSetContainer = css`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(212, 212, 212);
  box-shadow: 0px 2px 5px rgb(187, 187, 187);
  border-radius: 10px;
  width: 100%;
  margin: 5px auto;
  box-sizing: border-box;
  padding: 5px 10px;
  margin: 5px 0px;
  overflow-x: hidden;
`;

const newsBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid rgb(212, 212, 212);
  padding: 10px 0px;
  margin: 10px 0px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 2px;
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

const reporterInput = css`
  width: 100px;
  font-size: 1.02em;
`;

const dateInput = css`
  width: 120px;
  font-size: 1.02em;
`;

const titleTextarea = css`
  width: 100%;
  margin: 7px 0px;
  font-size: 1.1em;
  color: rgb(38, 57, 230);
  font-weight: 500;
  &::placeholder {
    font-size: 1.1em;
    color: rgb(38, 57, 230);
  }
`;

const contentTextarea = css`
  width: 100%;
  height: 80px;
`;

const newsImage = css`
  flex: 1.3;
  margin-left: 10px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const newsImageLine = css`
  height: 140px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  @media (max-width: 753px) {
    p {
      display: none;
    }
  }
`;

const deleteImageBtn = css`
  color: rgb(78, 78, 78);
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 1.2em;
  background-color: white;
  border-radius: 50%;
`;

const newsDeleteBtn = css`
  cursor: pointer;
  color: rgb(78, 78, 78);
  margin: 0 auto;
`;

const newsAddBtn = css`
  border: none;
  outline: inherit;
  cursor: pointer;
  height: 35px;
  width: 100px;
  border-radius: 5px;
  color: rgb(85, 85, 85);
  font-size: 1.05em;
  font-weight: 500;
  margin: 0 auto;
  background-color: inherit;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

interface PropsOfEl {
  newsContentConfiguration: NewsContentConfiguration;
  id: number;
}

const ElOfNews = ({ newsContentConfiguration, id }: PropsOfEl) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.newsReducer);

  const hadleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = [...content];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeNews({ content: data }));
  };

  const deleteNews = () => {
    const data = [...content];
    data.splice(id, 1);
    dispatch(changeNews({ content: data }));
  };

  const deleteImg = () => {
    const data = [...content];
    data[id] = { ...data[id], img: '' };
    dispatch(changeNews({ content: data }));
  };

  const onDrop = (pictureFiles: File[]) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const data = [...content];
        data[id] = {
          ...data[id],
          img: `${process.env.NEXT_PUBLIC_SERVER_API}/${res.data.filename}`,
        };
        dispatch(changeNews({ content: data }));
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div css={newsBox}>
      <div css={[flex, alignItems('center')]}>
        <div css={[flexColumn, flexNum(5)]}>
          <div css={flex}>
            <input
              type="text"
              css={reporterInput}
              placeholder="신문사"
              name="reporter"
              value={newsContentConfiguration.reporter}
              onChange={hadleInput}
            />
            <input
              type="text"
              css={dateInput}
              placeholder="기사 날짜"
              name="datetime"
              value={newsContentConfiguration.datetime}
              onChange={hadleInput}
            />
          </div>
          <input
            type="text"
            css={titleTextarea}
            value={newsContentConfiguration.title}
            placeholder="뉴스 제목"
            name="title"
            onChange={hadleInput}
          />
          <textarea
            value={newsContentConfiguration.content}
            css={contentTextarea}
            placeholder="뉴스 내용"
            name="content"
            onChange={hadleInput}
          />
        </div>
        <div css={newsImage}>
          <div css={newsImageLine}>
            <ImageUpload
              imageData={newsContentConfiguration.img}
              onDrop={onDrop}
            />
          </div>

          {newsContentConfiguration.img !== '' && (
            <FontAwesomeIcon
              css={deleteImageBtn}
              icon={faTimesCircle}
              onClick={deleteImg}
            />
          )}
        </div>
      </div>
      {id !== 0 && (
        <FontAwesomeIcon
          css={newsDeleteBtn}
          icon={faMinusCircle}
          onClick={deleteNews}
        />
      )}
    </div>
  );
};

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsSet = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.newsReducer);

  const addNews = () => {
    const data = [...content];
    data.push({ title: '', content: '', datetime: '', reporter: '', img: '' });
    dispatch(changeNews({ content: data }));
  };

  return (
    <div css={newsSetContainer}>
      <div css={[flex, alignItems('center')]}>
        <div css={sectionTitle}>뉴스</div>
        <div
          css={sectionOpenBtn}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div
          css={sectionDeleteBtn}
          onClick={() => {
            dispatch(resetNews());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          {content.map(
            (
              newsContentConfiguration: NewsContentConfiguration,
              id: number,
            ) => (
              <ElOfNews
                key={id}
                newsContentConfiguration={newsContentConfiguration}
                id={id}
              />
            ),
          )}
          <button css={newsAddBtn} onClick={addNews}>
            + 뉴스 추가
          </button>
        </>
      )}
    </div>
  );
};

export default NewsSet;
