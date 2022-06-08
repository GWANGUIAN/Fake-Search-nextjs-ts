import { css } from '@emotion/react';
import dynamic from 'next/dynamic';

const wholeImgBox = css`
  width: 100%;
  height: 100%;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
`;

const imgUploadBox = css`
  height: 100%;
  width: 100%;
  box-shadow: 0px 2px 2px rgb(187, 187, 187);
  box-sizing: border-box;
  .fileContainer {
    border: none;
    box-shadow: none;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 3px 5px;
    box-sizing: border-box;
    text-align: center;
    background-color: rgb(226, 226, 226);
  }
`;

const uplodadedImg = css`
  object-fit: cover;
  width: 100%;
  min-width: 110px;
  height: 100%;
`;

interface Props {
  imageData: string;
  onDrop: (pictureFiles: File[], imgNum?: string) => void;
  imgNum?: string;
}

const ImageUploader = dynamic(() => import('react-images-upload'), {
  ssr: false,
});

const ImageUpload = ({ imageData, onDrop, imgNum }: Props) => (
  <div css={wholeImgBox}>
    {imageData === '' ? (
      <ImageUploader
        withIcon={true}
        onChange={(pictureFiles) => {
          if (imgNum) {
            onDrop(pictureFiles, imgNum);
          } else {
            onDrop(pictureFiles);
          }
        }}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5_242_880}
        singleImage={true}
        css={imgUploadBox}
        buttonClassName="btn-img-upload"
      />
    ) : (
      <img css={uplodadedImg} src={imageData} alt="img-upload" />
    )}
  </div>
);

export default ImageUpload;
