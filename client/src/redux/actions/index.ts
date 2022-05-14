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
    type: 'profile';
    order: number;
    view: number;
    job: string;
    profileImg: string;
    name: string;
    info: Array<{ title: string; content: string }>;
    subinfo: Array<{
      title: string;
      content: Array<{ image: string; title: string }>;
    }>;
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
    view?: number;
    order?: number;
    content?: Array<{
      title: string;
      content: string;
      datetime: string;
      reporter: string;
      img: string;
    }>;
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
    view?: number;
    order?: number;
    content?: Array<{ img1: string; img2: string; img3: string; img4: string }>;
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
    view?: number;
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
