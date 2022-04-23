import { css } from '@emotion/react';

const container = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadingImg = css`
  width: 150px;
`;

const Loading = () => (
  <div css={container}>
    <img css={loadingImg} src="img/loading.svg" alt="img-loading" />
  </div>
);

export default Loading;
