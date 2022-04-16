import { CHANGEIMAGE, RESETIMAGE } from '../actions/index';

const imageReducer = (
  state = {
    type: 'image',
    view: 0,
    order: 3,
    content: {img1:'',img2:'',img3:'',img4:''}
  },
  action
) => {
  switch (action.type) {
    case CHANGEIMAGE:
      return {
        ...state,
        ...action.payload
      };
    case RESETIMAGE:
      return {
        ...state,
        type: 'image',
        view: 0,
        order: 3,
        content: {img1:'',img2:'',img3:'',img4:''}
      };

    default:
      return state;
  }
};

export default imageReducer;