import { css } from '@emotion/react';

const notFoundContainer = css`
  margin: 10px 10px;
  background-color: white;
  border-radius: 20px;
  padding: 70px 80px;
  border: 2px solid rgb(235, 235, 235);
  @media (max-width: 730px) {
    padding: 50px 20px;
  }
  ul {
    margin-left: 20px;
    font-size: 0.8em;
    color: rgb(104, 104, 104);
  }
  li {
    margin-bottom: 5px;
  }
`;

const titleText = css`
  margin-bottom: 40px;
  font-size: 1.3em;
  font-weight: 500;
  @media (max-width: 730px) {
    margin-bottom: 20px;
    font-size: 1.1em;
    font-weight: 500;
  }
`;

const textWord = css`
  color: rgb(230, 103, 29);
`;

interface Props {
  word: string;
}

const NotFound = ({ word }: Props) => (
  <div css={notFoundContainer}>
    <div css={titleText}>
      <span css={textWord}>{word !== undefined ? `'${word}'` : "' '"}</span>
      <span>에 해당하는 검색결과가 없습니다.</span>
    </div>
    <ul>
      <li>단어의 철자가 정확한지 확인해 보세요.</li>
      <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
      <li>
        검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.
      </li>
      <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
      <li>검색 옵션을 변경해서 다시 검색해 보세요.</li>
    </ul>
  </div>
);

export default NotFound;
