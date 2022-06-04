import { css } from '@emotion/react';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';

import Footer from '../components/Search/Footer';
import Images from '../components/Search/Images';
import Music from '../components/Search/Music';
import News from '../components/Search/News';
import NotFound from '../components/Search/NotFound';
import Profile from '../components/Search/Profile';
import type { RootState } from '../redux/reducers';
import {
  alignItems,
  bottomBorder,
  flexCenter,
  flexColumn,
  fontColor,
  minWidth,
} from '../styles/global';
import type { SearchWordOption } from '../types';
import changeDomain from '../utils/changeDomain';

const previewContainer = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
  overflow-x: hidden;
`;

const inputBox = (color: string) => css`
  ${flexCenter}
  ${alignItems('center')}
  ${bottomBorder(color)}
  &:hover {
    box-shadow: 0px 5px 4px rgb(233, 233, 233);
  }
`;

const inputInnerBox = css`
  position: relative;
  max-width: 1180px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 64px;
  @media (max-width: 680px) {
    width: 100vw;
  }
`;

const logoBox = css`
  flex: 1;
  text-align: center;
  padding: 0px 18px 0 20px;
  font-size: 2em;
  font-weight: 1000;
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

const searchInput = css`
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

const searchIcon = css`
  flex: 0.5;
  font-size: 1.3em;
  cursor: pointer;
`;

const settingBox = css`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  height: 30px;
  max-width: 30px;
  border-radius: 50%;
`;

const settingIcon = css`
  font-size: 1.2em;
  color: rgb(173, 173, 173);
  cursor: pointer;
`;

const categoryBox = css`
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

const categoryText = css`
  font-weight: 450;
  margin: 0 10px;
  cursor: pointer;
`;

const mobileCategoryNone = css`
  @media (max-width: 680px) {
    display: none;
  }
`;

const contentBox = css`
  background-color: rgb(242, 245, 246);
  min-height: 87.92vh;
  > div {
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
  }
`;

interface Props {
  word: SearchWordOption;
}

const Preview = ({ word }: Props) => {
  const { themeColor, siteName } = useSelector(
    (state: RootState) => state.loginReducer,
  );

  const profileData = useSelector((state: RootState) => state.profileReducer);
  const newsData = useSelector((state: RootState) => state.newsReducer);
  const imageData = useSelector((state: RootState) => state.imageReducer);
  const musicData = useSelector((state: RootState) => state.musicReducer);

  return (
    // <NewWindow features={{ width: 1180, height: 800 }} title="미리보기">
    <div css={previewContainer}>
      <div css={flexColumn}>
        <div css={inputBox(themeColor)}>
          <div css={inputInnerBox}>
            <div css={[logoBox, fontColor(themeColor)]}>
              {changeDomain(siteName)}
            </div>
            <input css={searchInput} value={word.value} />
            <FontAwesomeIcon
              css={searchIcon}
              icon={faSearch}
              style={{ color: themeColor }}
            />
            <div css={settingBox}>
              <FontAwesomeIcon css={settingIcon} icon={faCog} />
            </div>
          </div>
        </div>
        <div css={categoryBox}>
          <div>
            <div css={[categoryText, minWidth(40), fontColor(themeColor)]}>
              통합
            </div>
            <div css={[categoryText, minWidth(45)]}>블로그</div>
            <div css={[categoryText, minWidth(45)]}>이미지</div>
            <div css={[categoryText, minWidth(45)]}>동영상</div>
            <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
              쇼핑
            </div>
            <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
              뉴스
            </div>
            <div css={[categoryText, minWidth(60), mobileCategoryNone]}>
              어학사전
            </div>
            <div css={[categoryText, minWidth(40), mobileCategoryNone]}>
              지도
            </div>
            <div
              css={[
                categoryText,
                minWidth(45),
                fontColor('rgb(149, 149, 149)'),
              ]}
            >
              더보기
            </div>
          </div>
        </div>
      </div>
      <div css={contentBox}>
        <div>
          {[profileData, newsData, imageData, musicData]
            .sort((a, b) => a.order - b.order)
            .map((el, id) => {
              if (el.type === 'profile' && el.view) {
                return <Profile key={id} profileData={el} />;
              } else if (el.type === 'news' && el.view) {
                return <News key={id} newsData={el} />;
              } else if (el.type === 'image' && el.view) {
                return <Images key={id} imageData={el.content} />;
              } else if (el.type === 'music' && el.view) {
                return <Music key={id} musicData={el} />;
              }

              return '';
            })}
          {[profileData, newsData, imageData, musicData].every(
            (el) => !el.view,
          ) && <NotFound word={word.value} />}
        </div>
      </div>
      <Footer />
    </div>
    // </NewWindow>
  );
};

export default Preview;
