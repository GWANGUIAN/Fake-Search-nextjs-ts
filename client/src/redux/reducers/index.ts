import { combineReducers } from 'redux';

import imageReducer from './imageReducer';
import loginReducer from './loginReducer';
import musicReducer from './musicReducer';
import newsReducer from './newsReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  loginReducer,
  profileReducer,
  newsReducer,
  imageReducer,
  musicReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
