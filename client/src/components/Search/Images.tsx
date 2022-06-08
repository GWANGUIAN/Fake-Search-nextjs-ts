/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-add-event-listener */
import { css } from '@emotion/react';

import type { ImageContentConfigration } from '../../types/state';

const ImagesContainer = css`
  margin: 15px 10px;
  background-color: white;
  border-radius: 20px;
  padding: 20px 40px;
  border: 2px solid rgb(235, 235, 235);
  display: flex;
  flex-direction: column;
  @media (max-width: 550px) {
    padding: 10px 20px;
  }
`;

const titleSection = css`
  font-size: 1.35em;
  font-weight: 700;
  margin-right: 15px;
  margin-bottom: 20px;
  @media (max-width: 550px) {
    font-size: 1.1em;
  }
`;

const imagesBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const images = css`
  object-fit: cover;
  width: 255px;
  height: 180px;
  margin: 0px 2px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
  color: rgb(88, 88, 88);
  @media (max-width: 800px) {
    width: 180px;
    height: 130px;
  }
`;

const moreImageButton = css`
  margin: 0px -42px -22px -42px;
  height: 70px;
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid rgb(230, 230, 230);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2em;
  color: rgb(75, 75, 75);
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 550px) {
    margin: 0px -22px -22px -22px;
    height: 50px;
    font-size: 1.1em;
  }
`;

interface Props {
  imageData: ImageContentConfigration;
}

const ImagesCreator = (imageSrc: string) =>
  imageSrc !== '' ? (
    <img
      src={imageSrc}
      alt="images"
      css={images}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '../../img/no-image-row.png';
      }}
    />
  ) : (
    <div css={images}>
      설정된 이미지가
      <br />
      존재하지 않습니다.
    </div>
  );

const Images = ({ imageData }: Props) => (
  <div css={ImagesContainer}>
    <div css={titleSection}>이미지</div>
    <div css={imagesBox}>
      {ImagesCreator(imageData.img1)}
      {ImagesCreator(imageData.img2)}
      {ImagesCreator(imageData.img3)}
      {ImagesCreator(imageData.img4)}
    </div>
    <div css={moreImageButton}>이미지 더보기 &#10132;</div>
  </div>
);

export default Images;
