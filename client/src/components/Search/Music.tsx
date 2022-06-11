/* eslint-disable unicorn/prefer-add-event-listener */
/* eslint-disable unicorn/no-null */
import { css } from '@emotion/react';

import { margin } from '../../styles/common';
import type { MusicState } from '../../types/state';

interface Props {
  musicData: MusicState;
}

const musicContainer = css`
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

const songTitle = css`
  font-size: 1.25em;
  margin-bottom: 5px;
  @media (max-width: 550px) {
    font-size: 1.05em;
  }
`;

const musicInfoBox = css`
  display: flex;
  align-items: center;
  color: rgb(65, 65, 65);
`;

const albumImage = css`
  object-fit: cover;
  width: 160px;
  height: 160px;
  margin: 10px auto;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
  color: rgb(88, 88, 88);
`;

const songInfoTitle = css`
  font-size: 1.25em;
  margin-bottom: 5px;
  @media (max-width: 550px) {
    font-size: 1.05em;
  }
`;

const songInfoText = css`
  color: rgb(65, 65, 65);
  margin-bottom: 30px;
`;

const moreMusicButton = css`
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

const Music = ({ musicData }: Props) => (
  <div css={musicContainer}>
    <div css={titleSection}>음악</div>
    <div css={songTitle}>{musicData.title}</div>
    <div css={musicInfoBox}>
      <div css={margin(0, 0, 0, 15)}>{musicData.artist}</div>
      <div>{musicData.date}</div>
    </div>
    {musicData.album !== '' ? (
      <img
        css={albumImage}
        alt="img-album"
        src={musicData.album}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '../../img/no-image-row.png';
        }}
      />
    ) : (
      <div css={albumImage}>
        설정된 이미지가
        <br />
        존재하지 않습니다.
      </div>
    )}
    <div css={songInfoTitle}>곡 정보</div>
    <div css={songInfoText}>{musicData.info}</div>
    <div css={moreMusicButton}>음악 정보 더보기 &#10132;</div>
  </div>
);

export default Music;
