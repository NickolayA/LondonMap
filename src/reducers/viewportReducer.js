import {
  CHANGE_VIEWPORT
} from "../actions/types";

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: -0.1275,
  latitude: 51.507222,
  zoom: 12,
  maxZoom: 20,
  minZoom: 10,
  pitch: 45
};

const viewportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEWPORT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default viewportReducer;