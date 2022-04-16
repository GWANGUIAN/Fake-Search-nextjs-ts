import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import profileReducer from './profileReducer';
import newsReducer from './newsReducer';
import imageReducer from './imageReducer';
import musicReducer from './musicReducer';

const rootReducer = combineReducers({
  loginReducer,
  profileReducer,
  newsReducer,
  imageReducer,
  musicReducer,
});

export default rootReducer;