import type { AnyAction } from 'redux';

import type { ImageState } from '../../types/state';
import { CHANGEIMAGE, RESETIMAGE } from '../actions';

const initialState: ImageState = {
  type: 'image',
  view: false,
  order: 3,
  content: { img1: '', img2: '', img3: '', img4: '' },
};

const imageReducer = (state = initialState, action: AnyAction): ImageState => {
  switch (action.type) {
    case CHANGEIMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case RESETIMAGE:
      return initialState;

    default:
      return state;
  }
};

export default imageReducer;
