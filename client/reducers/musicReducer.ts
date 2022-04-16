import { CHANGEMUSIC, RESETMUSIC } from '../actions/index';

const musicReducer = (
  state = {
    type: 'music',
    view: 0,
    album: '',
    info: '',
    date: '',
    order: 4,
    title: '',
    artist: ''
  },
  action
) => {
  switch (action.type) {
    case CHANGEMUSIC:
      return {
        ...state,
        ...action.payload
      };
    case RESETMUSIC:
      return {
        ...state,
        type: 'music',
        view: 0,
        album: '',
        info: '',
        date: '',
        order: '4',
        title: '',
        artist: ''
      };

    default:
      return state;
  }
};

export default musicReducer;