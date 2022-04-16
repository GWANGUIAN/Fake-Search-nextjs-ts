import { CHANGENEWS, RESETNEWS } from '../actions/index';

const newsReducer = (
  state = {
    type: 'news',
    view: 0,
    order: 2,
    content: [{title:'', content: '', datetime: '', reporter:'', img:''}],
  },
  action
) => {
  switch (action.type) {
    case CHANGENEWS:
      return {
        ...state,
        ...action.payload
      };
    case RESETNEWS:
      return {
        ...state,
        type: 'news',
        view: 0,
        order: 2,
        content: [{title:'', content: '', datetime: '', reporter:'', img:''}],
      };

    default:
      return state;
  }
};

export default newsReducer;