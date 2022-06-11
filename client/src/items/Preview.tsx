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
  categoryBox,
  categoryText,
  contentBox,
  flexColumn,
  fontColor,
  inputBox,
  logoBox,
  minWidth,
  mobileCategoryNone,
  searchIcon,
  searchInput,
  settingBox,
  settingIcon,
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
