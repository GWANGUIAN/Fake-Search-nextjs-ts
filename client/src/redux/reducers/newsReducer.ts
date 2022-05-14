import type { AnyAction } from 'redux';

import type { NewsState } from '../../types/state';
import { CHANGENEWS, RESETNEWS } from '../actions';

const initialState: NewsState = {
  type: 'news',
  view: false,
  order: 2,
  content: [{ title: '', content: '', datetime: '', reporter: '', img: '' }],
};

const newsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHANGENEWS:
      return {
        ...state,
        ...action.payload,
      };
    case RESETNEWS:
      return initialState;

    default:
      return state;
  }
};

export default newsReducer;
