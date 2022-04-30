// import { css } from '@emotion/css';
import type { SerializedStyles } from '@emotion/react';
import { css, keyframes } from '@emotion/react';

import { fontPop, fontPretend } from './color';

export const container = css`
  max-width: 1920px;
  min-width: 1440px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  ${fontPretend}
  @media (max-width: 1023px) {
    min-width: 319px;
    width: 100%;
    overflow-y: scroll;
  }
`;

export const maxContainWidth = css`
  /* border: 1px solid blue; */
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const activeOpacity = css`
  opacity: 1;
`;

export const strong = css`
  font-weight: 800;
  /* margin-left: 10px; */
`;

export const pointer = css`
  cursor: pointer;
`;

export const layout = (height: number) => css`
  width: 1920px;
  height: ${height}px;
`;

export const maxContainer = (height: number | string, align: string) => css`
  /* border: 1px solid transparent; */
  width: 1440px;
  min-width: 1440px;
  height: ${height}px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  text-align: ${align};
  @media (max-width: 1023px) {
    width: 100%;
    min-width: 319px;
    max-width: 1023px;
    height: auto;
  }
`;

export const bannerMaxContainer = (height: number, align: string) => css`
  /* border: 1px solid blue; */
  width: 1440px;
  height: ${height}px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: right;
  text-align: ${align};
`;

export const margin = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  margin: ${top}px ${right}px ${bottom}px ${left}px;
`;

export const padding = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  padding: ${top}px ${right}px ${bottom}px ${left}px;
`;

export const defaultFont = (
  color: string,
  size: number,
  mColor?: string,
  mSize?: number,
) => css`
  color: ${color};
  font-size: ${size}px;
  @media (max-width: 1023px) {
    color: ${mColor ? mColor : color};
    font-size: ${mSize ? mSize : size}px;
  }
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

export const grow = (size: number) => css`
  flex-grow: ${size};
`;

export const fontColor = (color: string) => css`
  color: ${color};
`;

export const pagination = css`
  display: flex;
  justify-content: center;
  ${margin(165, 180, 0, 0)}
`;

export const prevAndNextButton = css`
  width: 20px;
  cursor: pointer;
  ${margin(0, 0, 10, 10)}
`;

export const pageButton = css`
  width: 30px;
  height: 30px;
  background: transparent;
  border: 1px solid #383838;
  ${margin(0, 0, 8, 8)}
  cursor: pointer;
  ${fontWeight(800)}
`;

export const dashLine = (length: number, color: string) => css`
  /* width: ${length}px; */
  flex-grow: 1;
  border: 1px dashed ${color};
  @media (max-width: 1023px) {
    flex-grow: 1;
    border: 1px dashed #e0e0e0;
  }
  @media (max-width: 380px) {
    display: none;
  }
`;

export const flex = css`
  display: flex;
`;

export const a11yInput = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
`;

export const processStep = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${lineHeightPX(30)}
  @media (max-width: 1023px) {
    ${lineHeightPX(20)}
  }
`;

export const specailBennerTitleText = css`
  ${defaultFont('#FFFFFF', 55)}
  ${fontWeight(700)}
  @media (max-width: 1023px) {
    font-size: 25px;
    ${fontWeight(300)}
    position: absolute;
    top: -135px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
  }
`;

export const mobileBold = css`
  @media (max-width: 1023px) {
    font-weight: 700;
  }
`;

export const bold = css`
  font-weight: 700;
`;

export const specialBannerTextCSS = css`
  position: absolute;
  top: 10%;
  right: 20%;
  @media (max-width: 1680px) {
    width: 380px;
    top: 8%;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const processDescriptions = css`
  display: flex;
  align-items: flex-start;
  @media (max-width: 1023px) {
    justify-content: space-around;
    width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const processStepSection = css`
  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
  }
`;

export const animationBoxCSS = css`
  ${absolute}
  background-color: rgba(0, 0, 0, 0.7);
  width: 305px;
  height: 63px;
  left: 0px;
  bottom: 0px;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  @media (max-width: 1023px) {
    left: 8px;
  }
`;

export const beforeAndAfterTitle = (photoTitleMargin: SerializedStyles) => css`
  display: flex;
  justify-content: center;
  ${photoTitleMargin}
  @media (max-width: 1023px) {
    ${margin(0, 50, 0, 0)}
  }
`;

export const beforeAndAfterPhotoBox = (photoBoxMargin: SerializedStyles) => css`
  display: flex;
  justify-content: center;
  position: relative;
  ${photoBoxMargin}
  @media (max-width: 1023px) {
    ${margin(0, 150, 0, 0)}
    flex-direction: column;
  }
`;

export const pillSection = css`
  ${padding(0, 0, 100, 80)}
  @media (max-width: 1023px) {
    ${padding(0, 0, 20, 20)}
  }
`;

export const mobileWordBreack = css`
  @media (max-width: 1023px) {
    word-break: keep-all;
    width: 100%;
  }
`;

export const opacityBoxCSS = (
  boxWidth: number,
  boxHeight: number,
  left: number,
) => css`
  position: absolute;
  top: 0;
  left: ${left}px;
  width: ${boxWidth}px;
  height: ${boxHeight}px;
  background: rgba(56, 56, 56, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${fontPretend};
  @media (max-width: 1023px) {
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
    max-width: 320px;
    max-height: 243px;
  }
`;

export const opacityButton = (
  width: number,
  hight: number,
  color: string,
) => css`
  width: ${width}px;
  height: ${hight}px;
  color: ${color};
  background-color: transparent;
  border: 1px solid #ffffff;
  cursor: pointer;
  ${fontPop};
`;

export const flexColumn = css`
  ${flex}
  flex-direction: column;
`;

export const flexCenter = css`
  ${flex}
  justify-content: center;
`;

export const surgeryInfo = css`
  display: flex;
  justify-content: center;
  @media (max-width: 1023px) {
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    margin-bottom: 50px;
  }
`;

export const surgeryInfoIcon = css`
  ${margin(50, 0, 50, 50)}
  ${fontPretend}
  @media (max-width: 1023px) {
    ${margin(0, 0, 0, 0)}
    ${padding(50, 0, 25, 25)}
    width: 120px;
  }
`;

export const flexGrow = (growNumber: number) => css`
  flex-grow: ${growNumber};
`;

export const link = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: yellowgreen;
  }
`;

export const termCSS = css`
  width: 100%;
  height: auto;
  text-align: left;
  ${padding(10, 10, 10, 10)}
  b {
    font-weight: 600;
  }
`;

export const termTitle = css`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  color: #383838;
  @media (max-width: 1023px) {
    font-size: 15px;
  }
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

export const inputSectionTitleBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 250px;
  width: 250px;
  height: auto;
  background-color: rgb(248, 248, 248);
  border-bottom: 1px solid #cccccc;
  color: #383838;
  @media (max-width: 1023px) {
    width: 300px;
    min-width: 100px;
  }
`;

export const inputSectionContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  height: auto;
  ${padding(10, 10, 20, 20)}
  width: 100%;
`;

export const termPrivacyBox = css`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #cccccc;
  ${padding(10, 10, 10, 10)}
`;

export const processStepDescription = css`
  ${defaultFont('#383838', 20)}
  @media (max-width: 1023px) {
    font-size: 15px;
  }
`;

export const processStepNumber = (color?: string) => css`
  ${defaultFont(color ? color : 'rgba(252, 118, 118,0.7)', 20)}
  ${fontWeight(600)}
  @media (max-width: 1023px) {
    ${fontWeight(800)}
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

export const defaultButton = (width: number, height: number) => css`
  width: ${width}px;
  height: ${height}px;
  color: #ffffff;
  background-color: #383838;
`;

export const checkboxCSS = css`
  width: 20px;
  height: 20px;
  ${pointer}
`;

export const checkedSMSCSS = css`
  width: 20px;
  height: 20px;
  ${pointer}
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const checkedSMSLabelCSS = css`
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const display = (mode: string) => css`
  display: ${mode};
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const importantDisplay = (mode: string) => css`
  display: ${mode};
  @media (max-width: 1023px) {
    display: block;
  }
`;

export const mobileSpace = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  @media (max-width: 1023px) {
    ${margin(top, bottom, left, right)}
  }
`;

export const pcSpace = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  ${margin(top, bottom, left, right)}
  @media (max-width: 1023px) {
    ${margin(0, 0, 0, 0)}
  }
`;

export const surgeryInfoTextCSS = css`
  ${defaultFont('#383838', 18)}
  ${margin(15, 5, 0, 0)}
  @media (max-width: 1023px) {
    ${defaultFont('#383838', 16)}
    ${fontWeight(700)}
    ${margin(15, 5, 0, 0)}
  }
`;

export const surgeryInfoDescriptionCSS = css`
  ${fontWeight(200)}
  ${defaultFont('#383838', 15)}
  @media (max-width: 1023px) {
    ${defaultFont('#383838', 15)}
    ${keepAllText}
  }
`;

export const answerCSS = css`
  ${defaultFont('#383838', 20)}
  ${fontPretend}
  ${textAlign('right')}
  ${fontWeight(200)}
  ${lineHeight(1.5)}
  @media (max-width: 1023px) {
    font-size: 15px;
    ${textAlign('left')}
    word-break: keep-all;
  }
`;

export const surgeryIcon = css`
  @media (max-width: 1023px) {
    width: 65px;
    height: 65px;
  }
`;

export const mobilePadding = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  @media (max-width: 1023px) {
    ${padding(top, bottom, left, right)}
  }
`;

export const footerImageTitleTextCSS = (color: string) => css`
  ${defaultFont(color, 51)};
  ${margin(0, 0, 10, 10)};
  ${fontWeight(100)};
  ${fontPop};
`;

export const selfCheckBox = (w: number, h: number, color: string) => css`
  width: ${w}px;
  height: ${h}px;
  border: 2px solid ${color};
  border-radius: 3px;
  ${pcSpace(0, 0, 20, 20)}
  @media (max-width: 1023px) {
    width: 21px;
    height: 21px;
    ${mobileSpace(0, 0, 10, 0)}
  }
  @media (max-width: 375px) {
    display: none;
  }
`;

export const iconSize = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
`;

export const maxSizeMobile = (size: number) => css`
  @media (max-width: 1023px) {
    max-width: ${size}px;
  }
`;

export const subSelfCheckBox = (w: number, h: number, color: string) => css`
  width: ${w}px;
  height: ${h}px;
  border: 2px solid ${color};
  border-radius: 3px;
  ${pcSpace(0, 0, 10, 20)}
  @media (max-width: 1023px) {
    width: 21px;
    height: 21px;
  }
`;

export const pcPadding = (
  top: number,
  bottom: number,
  left: number,
  right: number,
) => css`
  ${padding(top, bottom, left, right)}
  @media (max-width: 1023px) {
    ${padding(0, 0, 0, 0)}
  }
`;

export const opacityTitleCSS = css`
  ${fontWeight(300)}
  ${lineHeight(1.3)}
  ${defaultFont('#ffffff', 18)}
  @media (max-width: 1023px) {
    ${fontWeight(100)}
    ${lineHeight(1.3)}
    font-size: 15px;
  }
`;

export const opacityButtonCSS = css`
  ${fontPop}
  ${opacityButton(100, 30, '#ffffff')}
  ${margin(20, 0, 0, 0)}
  @media (max-width: 1023px) {
    ${leftterSpacing(1)}
    ${fontWeight(600)}
    ${defaultFont('#ffffff', 13)}
    ${opacityButton(72, 22, '#ffffff')}
  }
`;

const wave = keyframes`
  to {
    background-position: 315px 0, 0 0, 0 190px, 50px 195px;
  }
`;

export const skeleton = css`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: progress;
  border-radius: 10px;
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
    linear-gradient(#bdbdbd, #bdbdbd),
    radial-gradient(38px circle at 19px 19px, #bdbdbd 50%, transparent 51%),
    linear-gradient(#bdbdbd, #bdbdbd);
  background-repeat: no-repeat;
  background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
  animation: ${wave} 1.5s infinite;
  background-size: 500px 500px;
`;

export const widthAuto = css`
  width: auto;
`;
