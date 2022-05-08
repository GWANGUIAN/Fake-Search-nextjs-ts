import type { AnyAction } from 'redux';

import { LOGIN, LOGOUT } from '../actions';

const loginReducer = (
  state = {
    isLogin: false,
    oauth: '',
    id: 'default',
    siteName: 'FAKESEARCH',
    themeColor: '#2260FF',
  },
  action: AnyAction,
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        oauth: '',
        id: 'default',
        siteName: 'FAKESEARCH',
        themeColor: '#2260FF',
      };

    default:
      return state;
  }
};

export default loginReducer;
