import { css } from '@emotion/react';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Footer from '../components/Search/Footer';
import Images from '../components/Search/Images';
import Music from '../components/Search/Music';
import News from '../components/Search/News';
import NotFound from '../components/Search/NotFound';
import Profile from '../components/Search/Profile';
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
} from '../styles/common';
import type {
  ImageState,
  MusicState,
  NewsState,
  ProfileState,
} from '../types/state';
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

interface IData {
  profileReducer: ProfileState;
  newsReducer: NewsState;
  imageReducer: ImageState;
  musicReducer: MusicState;
}

const Preview = () => {
  const { word, searchData, siteData } = useRouter().query;
  const [profile, setProfile] = useState<ProfileState>({
    type: 'profile',
    order: 1,
    view: false,
    job: '',
    profileImg: '',
    name: '',
    info: [{ title: '', content: '' }],
    subinfo: [],
  });
  const [news, setNews] = useState<NewsState>({
    type: 'news',
    view: false,
    order: 2,
    content: [{ title: '', content: '', datetime: '', reporter: '', img: '' }],
  });
  const [image, setImage] = useState<ImageState>({
    type: 'image',
    view: false,
    order: 3,
    content: { img1: '', img2: '', img3: '', img4: '' },
  });
  const [music, setMusic] = useState<MusicState>({
    type: 'music',
    view: false,
    album: '',
    info: '',
    date: '',
    order: 4,
    title: '',
    artist: '',
  });
  const [siteName, setSiteName] = useState('FAKESEARCH');
  const [themeColor, setThemeColor] = useState('#2260FF');

  useEffect(() => {
    if (searchData !== undefined) {
      const { profileReducer, newsReducer, imageReducer, musicReducer }: IData =
        JSON.parse(searchData as string);
      setProfile(profileReducer);
      setNews(newsReducer);
      setImage(imageReducer);
      setMusic(musicReducer);
    }

    if (siteData !== undefined) {
      const { name, color }: { name: string; color: string } = JSON.parse(
        siteData as string,
      );
      setSiteName(name);
      setThemeColor(color);
    }
  }, [searchData, siteData]);

  return (
    <div css={previewContainer}>
      <div css={flexColumn}>
        <div css={inputBox(themeColor)}>
          <div css={inputInnerBox}>
            <div css={[logoBox, fontColor(themeColor)]}>
              {changeDomain(siteName)}
            </div>
            <input css={searchInput} value={word} />
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
          {[profile, news, image, music]
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
          {[profile, news, image, music].every((el) => !el.view) && (
            <NotFound word={word as string} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Preview;
