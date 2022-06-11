/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-add-event-listener */
import { css } from '@emotion/react';

import { flexNum } from '../../styles/common';
import type { NewsContentConfiguration, NewsState } from '../../types/state';

const newsContainer = css`
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

const newsBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(233, 233, 233);
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const lastNewsBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const firstNewsLine = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 550px) {
    margin-bottom: 5px;
  }
`;

const reporter = css`
  color: rgb(93, 93, 93);
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const newsDate = css`
  color: rgb(93, 93, 93);
  cursor: pointer;
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const newsTitle = css`
  color: rgb(23, 44, 226);
  font-size: 1.1em;
  cursor: pointer;
  margin-bottom: 3px;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 550px) {
    font-size: 1.05em;
  }
`;

const newsContent = css`
  color: rgb(63, 63, 63);
  font-size: 0.95em;
  @media (max-width: 550px) {
    font-size: 0.9em;
  }
`;

const newsImage = css`
  flex: 1;
  width: 180px;
  height: 120px;
  object-fit: cover;
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
  @media (min-width: 680px) and (max-width: 900px) {
    flex: 1.7;
  }
  @media (max-width: 680px) {
    flex: 2.2;
  }
`;

const moreNewsButton = css`
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

interface ElOfNewsProps {
  key: number;
  el: NewsContentConfiguration;
  id: number;
  lastID: number;
}

const ElOfNews = ({ el, id, lastID }: ElOfNewsProps) => (
  <div css={id === lastID ? lastNewsBox : newsBox}>
    <div css={flexNum(5)}>
      <div css={firstNewsLine}>
        <div css={reporter}>{el.reporter}</div>
        <div css={newsDate}>{el.datetime}</div>
      </div>
      <div css={newsTitle}>{el.title}</div>
      <div css={newsContent}>{el.content}</div>
    </div>

    {el.img !== '' ? (
      <img
        src={el.img}
        alt="img-news"
        css={newsImage}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '../../img/no-image-row.png';
        }}
      />
    ) : (
      <div css={newsImage}>
        설정된 이미지가
        <br />
        존재하지 않습니다.
      </div>
    )}
  </div>
);

interface Props {
  newsData: NewsState;
}

const News = ({ newsData }: Props) => (
  <div css={newsContainer}>
    <div css={titleSection}>뉴스</div>
    {newsData.content.map((el, id) => (
      <ElOfNews key={id} el={el} id={id} lastID={newsData.content.length - 1} />
    ))}
    <div css={moreNewsButton}>뉴스 더보기 &#10132;</div>
  </div>
);

export default News;
