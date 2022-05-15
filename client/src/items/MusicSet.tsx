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
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

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
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        dispatch(
          changeMusic({
            album: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
          }),
        );
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div css="musicset-container">
      <div css="box-section-title">
        <div css="section-title">음악</div>
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
            id="title-music"
            name="title"
            value={title}
            onChange={handleInput}
          />
          <div css="music-subinfo">
            <input
              type="text"
              placeholder="가수"
              id="singer"
              name="artist"
              value={artist}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="발매일"
              id="date"
              name="date"
              value={date}
              onChange={handleInput}
            />
          </div>
          <div id="img-album">
            <div id="img-album-line">
              <ImageUpload imageData={album} onDrop={onDrop} />
            </div>

            {album !== '' && (
              <FontAwesomeIcon
                css="btn-delete-album"
                icon={faTimesCircle}
                onClick={() => {
                  dispatch(changeMusic({ album: '' }));
                }}
              />
            )}
          </div>

          <div id="info-song">곡 정보</div>
          <textarea
            placeholder="곡 정보"
            id="script-song"
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
