import { css } from '@emotion/react';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { changeImage, resetImage } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import {
  alignItems,
  flex,
  sectionDeleteBtn,
  sectionOpenBtn,
  sectionTitle,
} from '../styles/global';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

const imagesetContainer = css`
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

const imageBox = css`
  display: flex;
  align-items: top;
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

const imageElement = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  position: relative;
`;

const imageElementLine = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  margin-bottom: 5px;
  height: 150px;
  width: 98%;
`;

const deleteBtn = css`
  color: rgb(78, 78, 78);
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 1.2em;
`;

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageSet = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.imageReducer);

  const onDrop: (pictureFiles: File[], imgNum: string | undefined) => void = (
    pictureFiles,
    imgNum,
  ) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (imgNum) {
          dispatch(
            changeImage({
              content: {
                ...content,
                [imgNum]: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
              },
            }),
          );
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  const deleteImg = (imgNum: string) => {
    dispatch(changeImage({ content: { ...content, [imgNum]: '' } }));
  };

  const createImageElement = (src: string, key: string) => (
    <div css={imageElement}>
      <div css={imageElementLine}>
        <ImageUpload imageData={src} onDrop={onDrop} imgNum={key} />
      </div>

      {src === '' ? (
        ''
      ) : (
        <FontAwesomeIcon
          css={deleteBtn}
          icon={faTimesCircle}
          onClick={() => {
            deleteImg(key);
          }}
        />
      )}
    </div>
  );

  return (
    <div css={imagesetContainer}>
      <div css={[flex, alignItems('center')]}>
        <div css={sectionTitle}>이미지</div>
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
            dispatch(resetImage());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <div css={imageBox}>
          {createImageElement(content.img1 as string, 'img1')}
          {createImageElement(content.img2 as string, 'img2')}
          {createImageElement(content.img3 as string, 'img3')}
          {createImageElement(content.img4 as string, 'img4')}
        </div>
      )}
    </div>
  );
};

export default ImageSet;
