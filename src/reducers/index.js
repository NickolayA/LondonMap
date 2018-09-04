import { combineReducers } from "redux";
import viewportReducer from "./viewportReducer";
import neededPlacesReducer from "./neededPlacesReducer";
import routesReducer from "./routesReducer";
const rootReducer = combineReducers({
  viewport: viewportReducer,
  neededPlaces: neededPlacesReducer,
  routesReducer: routesReducer
});

export default rootReducer;
