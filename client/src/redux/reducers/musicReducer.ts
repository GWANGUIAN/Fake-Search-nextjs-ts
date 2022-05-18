import type { AnyAction } from 'redux';

import type { MusicState } from '../../types/state';
import { CHANGEMUSIC, RESETMUSIC } from '../actions';

const initialState: MusicState = {
  type: 'music',
  view: false,
  album: '',
  info: '',
  date: '',
  order: 4,
  title: '',
  artist: '',
};

const musicReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHANGEMUSIC:
      return {
        ...state,
        ...action.payload,
      };
    case RESETMUSIC:
      return initialState;

    default:
      return state;
  }
};

export default musicReducer;
