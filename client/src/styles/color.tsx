import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

export const fontPretend = css`
  font-family: Pretendard;
`;

export const fontPop = css`
  font-family: Poppins;
`;

export const colorWhite = css`
  color: rgb(255, 255, 255);
`;

export const colorBlack = css`
  color: #383838;
`;

export const colorNavLink = css`
  color: rgb(254, 192, 154);
`;

export const colorNavMenuLink = css`
  color: rgb(242, 140, 135);
`;

export const semiWhite = css`
  color: rgb(250, 250, 250);
`; // 안먹음

export const thisPathColor = css`
  color: gray;
  font-weight: 700;
`;

export const primary = css`
  color: #fc7676;
`;

export const primaryBackground = css`
  background-color: #fc7676;
`;

export const primaryText = (text: string, style?: SerializedStyles) => (
  <span css={[primary, style]}>{text}</span>
);
