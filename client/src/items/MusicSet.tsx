import { css } from '@emotion/react';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeMusic, resetMusic } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import {
  alignItems,
  flex,
  heightPx,
  sectionDeleteBtn,
  sectionOpenBtn,
  sectionTitle,
  widthPx,
} from '../styles/common';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

const musicSetContainer = css`
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
  overflow-x: hidden;
`;

const inputSongTitle = css`
  margin: 10px 0px 5px 0px;
  font-size: 1.1em;
  font-weight: 600;
`;

const inputSinger = css`
  font-size: 1em;
  width: 120px;
`;

const inputDate = css`
  font-size: 1em;
  width: 180px;
`;

const albumImage = css`
  margin: 0px auto;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 753px) {
    p {
      display: none;
    }
  }
`;

const albumDeleteBtn = css`
  color: rgb(78, 78, 78);
  cursor: pointer;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  top: 6px;
  right: 6px;
  font-size: 1.2em;
`;
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicSet = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useDispatch();
  const { title, artist, date, album, info } = useSelector(
    (state: RootState) => state.musicReducer,
  );

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch(changeMusic({ [e.target.name]: e.target.value }));
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
        dispatch(
          changeMusic({
            album: `${process.env.NEXT_PUBLIC_SERVER_API}/${res.data.filename}`,
          }),
        );
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div css={musicSetContainer}>
      <div css={[flex, alignItems('center')]}>
        <div css={sectionTitle}>음악</div>
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
            dispatch(resetMusic());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          <input
            type="text"
            placeholder="곡명"
            css={inputSongTitle}
            name="title"
            value={title}
            onChange={handleInput}
          />
          <div>
            <input
              type="text"
              placeholder="가수"
              css={inputSinger}
              name="artist"
              value={artist}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="발매일"
              css={inputDate}
              name="date"
              value={date}
              onChange={handleInput}
            />
          </div>
          <div css={albumImage}>
            <div css={[widthPx(150), heightPx(150)]}>
              <ImageUpload imageData={album} onDrop={onDrop} />
            </div>

            {album !== '' && (
              <FontAwesomeIcon
                css={albumDeleteBtn}
                icon={faTimesCircle}
                onClick={() => {
                  dispatch(changeMusic({ album: '' }));
                }}
              />
            )}
          </div>

          <div>곡 정보</div>
          <textarea
            placeholder="곡 정보"
            css={heightPx(100)}
            name="info"
            value={info}
            onChange={handleInput}
          />
        </>
      )}
    </div>
  );
};

export default MusicSet;
