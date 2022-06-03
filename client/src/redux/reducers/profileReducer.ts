import type { AnyAction } from 'redux';

import type { ProfileState } from '../../types/state';
import { CHANGEPROFILE, RESETPROFILE } from '../actions';

const initialState: ProfileState = {
  type: 'profile',
  order: 1,
  view: false,
  job: '',
  profileImg: '',
  name: '',
  info: [{ title: '', content: '' }],
  subinfo: [],
};

const profileReducer = (
  state = initialState,
  action: AnyAction,
): ProfileState => {
  switch (action.type) {
    case CHANGEPROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case RESETPROFILE:
      return initialState;

    default:
      return state;
  }
};

export default profileReducer;
