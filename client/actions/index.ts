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

export const login = (state) => {
  return {
    type: LOGIN,
    payload: { isLogin: true, ...state },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const changeProfile = (state) => {
  return {
    type: CHANGEPROFILE,
    payload: state,
  };
};

export const resetProfile = () => {
  return {
    type: RESETPROFILE,
  };
};

export const changeNews = (state) => {
  return {
    type: CHANGENEWS,
    payload: state,
  };
};

export const resetNews = () => {
  return {
    type: RESETNEWS,
  };
};

export const changeImage = (state) => {
  return {
    type: CHANGEIMAGE,
    payload: state,
  };
};

export const resetImage = () => {
  return {
    type: RESETIMAGE,
  };
};

export const changeMusic = (state) => {
  return {
    type: CHANGEMUSIC,
    payload: state,
  };
};

export const resetMusic = () => {
  return {
    type: RESETMUSIC,
  };
};
