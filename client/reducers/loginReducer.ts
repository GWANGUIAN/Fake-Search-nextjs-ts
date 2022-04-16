import { LOGIN, LOGOUT } from '../actions/index';

const loginReducer = (
  state = {
    isLogin: false,
    oauth: '',
    id: 'default',
    siteName: '',
    themeColor: '#2260FF',
  },
  action
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