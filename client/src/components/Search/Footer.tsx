import { css } from '@emotion/react';

const footerContainer = css`
  display: flex;
  height: 160px;
  width: 100vw;
  background-color: rgb(240, 240, 240);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const footerBox = css`
  padding-left: 8%;
  max-width: 1180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const logoTextEn = css`
  font-weight: 600;
  color: rgb(95, 95, 95);
  margin-bottom: 3px;
  span {
    cursor: pointer;
  }
`;

const logoTextKr = css`
  font-weight: 400;
  color: rgb(63, 63, 63);
  margin-bottom: 12px;
  font-size: 0.95em;
  span {
    cursor: pointer;
  }
`;

const creator = css`
  font-weight: 600;
  color: rgb(95, 95, 95);
  margin-bottom: 3px;
`;

const blog = css`
  font-weight: 200;
  color: #3f3f3f;
  text-decoration: none;
  font-size: 0.95em;
  &:visited {
    color: #3f3f3f;
  }
`;

const Footer = () => (
  <div css={footerContainer}>
    <div css={footerBox}>
      <div css={logoTextEn}>
        <span
          onClick={() => {
            window.location.replace('/');
          }}
        >
          FAKESEARCH
        </span>
      </div>
      <div css={logoTextKr}>
        <span
          onClick={() => {
            window.location.replace('/');
          }}
        >
          페이크서치
        </span>
      </div>
      <div css={creator}>Creator</div>
      <div>
        <a css={blog} href="https://velog.io/@bbaa3218">
          GWANGUIAN
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
