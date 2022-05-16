import { css } from '@emotion/react';

export const pointer = css`
  cursor: pointer;
`;

export const margin = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  margin: ${top}px ${right}px ${bottom}px ${left}px;
`;

export const marginPercent = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  margin: ${top}% ${right}% ${bottom}% ${left}%;
`;

export const padding = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  padding: ${top}px ${right}px ${bottom}px ${left}px;
`;

export const keepAllText = css`
  word-break: keep-all;
`;

export const fontWeight = (weight: number) => css`
  font-weight: ${weight};
`;

export const textAlign = (direction: string) => css`
  text-align: ${direction};
`;

export const lineHeight = (height: number) => css`
  line-height: ${height};
`;
export const lineHeightPX = (height: number) => css`
  line-height: ${height}px;
`;

export const relative = css`
  position: relative;
`;

export const absolute = css`
  position: absolute;
`;

export const background = (color: string) => css`
  background-color: ${color};
`;

export const zIndex = (index: number) => css`
  z-index: ${index};
`;

export const leftterSpacing = (spaceSize: number) => css`
  letter-spacing: ${spaceSize}px;
`;

export const elementWidth = (width: number) => css`
  width: ${width}%;
`;

export const fontColor = (color: string) => css`
  color: ${color};
`;

export const flex = css`
  display: flex;
`;

export const bold = css`
  font-weight: 700;
`;

export const flexColumn = css`
  ${flex}
  flex-direction: column;
`;

export const flexCenter = css`
  ${flex}
  justify-content: center;
`;

export const elementWidthPX = (width: number) => css`
  width: ${width}px;
`;

export const alignItems = (posotion: string) => css`
  align-items: ${posotion};
`;

export const between = css`
  display: flex;
  justify-content: space-between;
`;

export const display = (mode: string) => css`
  display: ${mode};
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const displayFlex = (direction = 'row') => css`
  display: flex;
  flex-direction: ${direction};
`;

export const displayNone = css`
  display: none;
`;

export const flexNum = (num: number) => css`
  flex: ${num};
`;

export const hidden = css`
  visibility: hidden;
`;

export const sectionTitle = css`
  flex: 1.5;
  font-size: 1.2em;
  color: rgb(187, 187, 187);
  font-weight: 500;
`;

export const sectionOpenBtn = css`
  flex: 0.1;
  min-width: 50px;
  color: rgb(83, 83, 83);
  cursor: pointer;
  margin-left: auto;
  font-weight: 700;
`;

export const sectionDeleteBtn = css`
  flex: 0.1;
  min-width: 50px;
  color: rgb(46, 46, 46);
  cursor: pointer;
  margin-left: auto;
`;

export const sectionInput = css`
  &[type='text'] {
    border: none;
    &:hover {
      border: 1px solid rgb(165, 165, 165);
      border-radius: 2px;
    }
  }
`;

export const sectionTextarea = css`
  resize: none;
  border: none;
  &:hover {
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
  &:focus {
    outline: inherit;
    border: 1px solid rgb(165, 165, 165);
    border-radius: 2px;
  }
`;
