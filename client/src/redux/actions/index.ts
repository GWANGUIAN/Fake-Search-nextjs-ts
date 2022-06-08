import type {
  ImageContentConfigration,
  NewsContentConfiguration,
  ProfileInfo,
  ProfileSubInfo,
} from '../../types/state';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGEPROFILE = 'CHANGEPROFILE';
export const RESETPROFILE = 'RESETPROFILE';
export const CHANGENEWS = 'CHANGENEWS';
export const RESETNEWS = 'RESETNEWS';
export const CHANGEIMAGE = 'CHANGEIMAGE';
export const RESETIMAGE = 'RESETIMAGE';
export const CHANGEMUSIC = 'CHANGEMUSIC';
export const RESETMUSIC = 'RESETMUSIC';

export const login =
  (state: {
    isLogin?: boolean;
    oauth?: string;
    id?: string;
    siteName?: string;
    themeColor?: string;
  }) =>
  (dispatch: any) => {
    dispatch({
      type: LOGIN,
      payload: { isLogin: true, ...state },
    });
  };

export const logout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  });
};

export const changeProfile =
  (state: {
    type?: 'profile';
    order?: number;
    view?: boolean;
    job?: string;
    profileImg?: string;
    name?: string;
    info?: ProfileInfo[];
    subinfo?: ProfileSubInfo[];
  }) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGEPROFILE,
      payload: state,
    });
  };

export const resetProfile = () => (dispatch: any) => {
  dispatch({
    type: RESETPROFILE,
  });
};

export const changeNews =
  (state: {
    type?: 'news';
    view?: boolean;
    order?: number;
    content?: NewsContentConfiguration[];
  }) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGENEWS,
      payload: state,
    });
  };

export const resetNews = () => (dispatch: any) => {
  dispatch({
    type: RESETNEWS,
  });
};

export const changeImage =
  (state: {
    type?: 'image';
    view?: boolean;
    order?: number;
    content?: ImageContentConfigration;
  }) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGEIMAGE,
      payload: state,
    });
  };

export const resetImage = () => (dispatch: any) => {
  dispatch({
    type: RESETIMAGE,
  });
};

export const changeMusic =
  (state: {
    type?: 'music';
    view?: boolean;
    album?: string;
    info?: string;
    date?: string;
    order?: number;
    title?: string;
    artist?: string;
  }) =>
  (dispatch: any) => {
    dispatch({
      type: CHANGEMUSIC,
      payload: state,
    });
  };

export const resetMusic = () => (dispatch: any) => {
  dispatch({
    type: RESETMUSIC,
  });
};
