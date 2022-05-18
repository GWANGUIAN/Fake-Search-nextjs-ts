import type { AnyAction } from 'redux';

import type { LoginState } from '../../types/state';
import { LOGIN, LOGOUT } from '../actions';

const initialState: LoginState = {
  isLogin: false,
  oauth: '',
  id: 'default',
  siteName: 'FAKESEARCH',
  themeColor: '#2260FF',
};

const loginReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
