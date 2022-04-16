import { CHANGEPROFILE, RESETPROFILE } from '../actions/index';

const profileReducer = (
  state = {
    type: 'profile',
    order: 1,
    view: 0,
    job: '',
    profileImg:'',
    name: '',
    info: [{title:'',content:''}],
    subinfo: [],
  },
  action
) => {
  switch (action.type) {
    case CHANGEPROFILE:
      return {
        ...state,
        ...action.payload
      };
    case RESETPROFILE:
      return {
        ...state,
        type: 'profile',
        order: 1,
        view: 0,
        job: '',
        profileImg:'',
        name: '',
        info: [{title:'',content:''}],
        subinfo: [],
      };

    default:
      return state;
  }
};

export default profileReducer;