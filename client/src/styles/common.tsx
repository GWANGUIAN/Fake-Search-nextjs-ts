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

export const widthPx = (width: number) => css`
  width: ${width}px;
`;

export const heightPx = (height: number) => css`
  height: ${height}px;
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

export const bottomBorder = (color: string) => css`
  border-bottom: 1px solid ${color};
`;

export const minWidth = (width: number) => css`
  min-width: ${width}px;
`;

export const inputBox = (color: string) => css`
  ${flexCenter}
  ${alignItems('center')}
  ${bottomBorder(color)}
  &:hover {
    box-shadow: 0px 5px 4px rgb(233, 233, 233);
  }
`;

export const inputInnerBox = css`
  position: relative;
  max-width: 1180px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 64px;
`;

export const logoBox = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 18px 0 20px;
  font-size: 2em;
  font-weight: 800;
  position: relative;
  max-width: 30px;
  cursor: pointer;
  @media (max-width: 440px) {
    margin-left: 10px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    height: 50%;
    border-right: 0.5px solid rgb(206, 206, 206);
  }
`;

export const searchInput = css`
  flex: 15;
  margin-left: 10px;
  border: inherit;
  font-size: 1.3em;
  font-weight: 600;
  vertical-align: middle;
  min-width: 50px;
  &:focus {
    outline: none;
  }
`;

export const searchIcon = css`
  flex: 0.5;
  font-size: 1.3em;
  cursor: pointer;
`;

export const settingBox = css`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  height: 30px;
  max-width: 30px;
  border-radius: 50%;
`;

export const settingIcon = css`
  font-size: 1.2em;
  color: rgb(173, 173, 173);
  cursor: pointer;
`;

export const categoryBox = css`
  box-shadow: 0px 2px 3px rgb(209, 209, 209);
  z-index: 10;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  > div {
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 23px;
  }
`;

export const categoryText = css`
  font-weight: 450;
  margin: 0 10px;
  cursor: pointer;
`;

export const mobileCategoryNone = css`
  @media (max-width: 680px) {
    display: none;
  }
`;

export const contentBox = css`
  background-color: rgb(242, 245, 246);
  min-height: 87.92vh;
  > div {
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
  }
`;
