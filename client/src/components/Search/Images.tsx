/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-add-event-listener */
import type { ImageContentConfigration } from '../../types/state';

interface Props {
  imageData: ImageContentConfigration;
}

const Images = ({ imageData }: Props) => (
  <div className="image-container">
    <div className="section-title">이미지</div>
    <div className="box-images">
      {imageData.img1 !== '' ? (
        <img
          src={imageData.img1}
          alt="images"
          className="images"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '../../img/no-image-row.png';
          }}
        />
      ) : (
        <div className="images">
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}
      {imageData.img2 !== '' ? (
        <img
          src={imageData.img2}
          alt="images"
          className="images"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '../../img/no-image-row.png';
          }}
        />
      ) : (
        <div className="images">
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}{' '}
      {imageData.img3 !== '' ? (
        <img
          src={imageData.img3}
          alt="images"
          className="images"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '../../img/no-image-row.png';
          }}
        />
      ) : (
        <div className="images">
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}{' '}
      {imageData.img4 !== '' ? (
        <img
          src={imageData.img4}
          alt="images"
          className="images"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '../../img/no-image-row.png';
          }}
        />
      ) : (
        <div className="images">
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}
    </div>
    <div className="btn-more-image">이미지 더보기 &#10132;</div>
  </div>
);

export default Images;
