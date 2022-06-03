import './Preview.css';
import '../../Search/SearchComponent.css';
import '../../Search/SearchComponent_mobile.css';

import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';

import Footer from '../components/Search/Footer';
import Images from '../components/Search/Images';
import Music from '../components/Search/Music';
import News from '../components/Search/News';
import NotFound from '../components/Search/NotFound';
import Profile from '../components/Search/Profile';
import type { RootState } from '../redux/reducers';
import type { SearchWordOption } from '../types';
import changeDomain from '../utils/changeDomain';

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
    <NewWindow features={{ width: 1180, height: 800 }} title="미리보기">
      <div css="preview-container">
        <div css="box-menu">
          <div
            css="box-input"
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div css="inner-box-input">
              <div css="box-logo" style={{ color: themeColor }}>
                {changeDomain(siteName)}
              </div>
              <input css="input-search" value={word.value} />
              <FontAwesomeIcon
                css="icon-search"
                icon={faSearch}
                style={{ color: themeColor }}
              />
              <div css="box-setting">
                <FontAwesomeIcon css="icon-setting" icon={faCog} />
              </div>
            </div>
          </div>
          <div css="box-category">
            <div css="inner-box-category">
              <div css="text-categories all" style={{ color: themeColor }}>
                통합
              </div>
              <div css="text-categories view">블로그</div>
              <div css="text-categories image">이미지</div>
              <div css="text-categories video">동영상</div>
              <div css="text-categories shopping">쇼핑</div>
              <div css="text-categories news">뉴스</div>
              <div css="text-categories dictionary">어학사전</div>
              <div css="text-categories map">지도</div>
              <div css="text-categories more">더보기</div>
            </div>
          </div>
        </div>
        <div css="box-content">
          <div css="inner-box-content">
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
    </NewWindow>
  );
};

export default Preview;
