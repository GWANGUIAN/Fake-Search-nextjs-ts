import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { changeImage, resetImage } from '../redux/actions';
import type { RootState } from '../redux/reducers';
import { logger } from '../utils/logger';
import ImageUpload from './ImageUpload';

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

  return (
    <div className="imageset-container">
      <div className="box-section-title">
        <div className="section-title">이미지</div>
        <div
          className="btn-open"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div
          className="btn-delete-section"
          onClick={() => {
            dispatch(resetImage());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <div className="box-image">
          <div className="el-img">
            <div className="el-img-line">
              <ImageUpload
                imageData={content.img1}
                onDrop={onDrop}
                imgNum="img1"
              />
            </div>

            {content.img1 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className="btn-delete-img"
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img1');
                }}
              />
            )}
          </div>
          <div className="el-img">
            <div className="el-img-line">
              <ImageUpload
                imageData={content.img2}
                onDrop={onDrop}
                imgNum="img2"
              />
            </div>

            {content.img2 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className="btn-delete-img"
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img2');
                }}
              />
            )}
          </div>
          <div className="el-img">
            <div className="el-img-line">
              <ImageUpload
                imageData={content.img3}
                onDrop={onDrop}
                imgNum="img3"
              />
            </div>

            {content.img3 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className="btn-delete-img"
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img3');
                }}
              />
            )}
          </div>
          <div className="el-img">
            <div className="el-img-line">
              <ImageUpload
                imageData={content.img4}
                onDrop={onDrop}
                imgNum="img4"
              />
            </div>

            {content.img4 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className="btn-delete-img"
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img4');
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSet;
