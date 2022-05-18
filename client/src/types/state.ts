export interface LoginState {
  isLogin: boolean;
  oauth: string;
  id: string;
  siteName: string;
  themeColor: string;
}

export interface ImageContentConfigration {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

export interface ImageState {
  type: 'image';
  view: boolean;
  order: number;
  content: ImageContentConfigration;
}

export interface MusicState {
  type: 'music';
  view: boolean;
  album: string;
  info: string;
  date: string;
  order: number;
  title: string;
  artist: string;
}

export interface NewsContentConfiguration {
  title: string;
  content: string;
  datetime: string;
  reporter: string;
  img: string;
}

export interface NewsState {
  type: 'news';
  view: boolean;
  order: number;
  content: NewsContentConfiguration[];
}

export interface ProfileInfo {
  title: string;
  content: string;
}

export interface ProfileSubInfoContent {
  image: string;
  title: string;
}

export interface ProfileSubInfo {
  title: string;
  content: ProfileSubInfoContent[];
}

export interface ProfileState {
  type: 'profile';
  order: number;
  view: boolean;
  job: string;
  profileImg: string;
  name: string;
  info: ProfileInfo[];
  subinfo: ProfileSubInfo[];
}
