import { combineReducers } from "redux";
import viewportReducer from "./viewportReducer";
const rootReducer = combineReducers({ viewport: viewportReducer });

export default rootReducer;
