import type { ImageState, MusicState, NewsState, ProfileState } from './state';

export interface AutoCompleteConfig {
  id: number;
  word: string;
}

export interface SearchWordList {
  word: string;
}

export interface SearchDataConfig {
  id: number;
  userId: number;
  word: string;
  profile: ProfileState;
  news: NewsState;
  image: ImageState;
  music: MusicState;
}

export interface SearchWordOption {
  value: string;
  label: string;
}

export interface SelectMenuOption {
  value: number;
  label: string;
}
