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
import type { NewsContentConfiguration } from '../types/state';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

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
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const data = [...content];
        data[id] = {
          ...data[id],
          img: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
        };
        dispatch(changeNews({ content: data }));
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div css="box-news">
      <div css="inline-box-news">
        <div css="box-news-content">
          <div css="news-line-first">
            <input
              type="text"
              css="reporter"
              placeholder="신문사"
              name="reporter"
              value={newsContentConfiguration.reporter}
              onChange={hadleInput}
            />
            <input
              type="text"
              css="news-date"
              placeholder="기사 날짜"
              name="datetime"
              value={newsContentConfiguration.datetime}
              onChange={hadleInput}
            />
          </div>
          <input
            type="text"
            css="title-news"
            value={newsContentConfiguration.title}
            placeholder="뉴스 제목"
            name="title"
            onChange={hadleInput}
          />
          <textarea
            value={newsContentConfiguration.content}
            css="content-news"
            placeholder="뉴스 내용"
            name="content"
            onChange={hadleInput}
          />
        </div>
        <div css="img-news">
          <div css="img-news-line">
            <ImageUpload
              imageData={newsContentConfiguration.img}
              onDrop={onDrop}
            />
          </div>

          {newsContentConfiguration.img !== '' && (
            <FontAwesomeIcon
              css="btn-delete-img"
              icon={faTimesCircle}
              onClick={deleteImg}
            />
          )}
        </div>
      </div>
      {id !== 0 && (
        <FontAwesomeIcon
          css="btn-delete-news"
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
    <div css="newsset-container">
      <div css="box-section-title">
        <div css="section-title">뉴스</div>
        <div
          css="btn-open"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div
          css="btn-delete-section"
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
          <button id="btn-add-news" onClick={addNews}>
            + 뉴스 추가
          </button>
        </>
      )}
    </div>
  );
};

export default NewsSet;
