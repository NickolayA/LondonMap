import {
  ADD_NEEDED_PLACES
} from "../actions/types";

const neededPlacesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEEDED_PLACES:
      if (!("error" in action.payload)) {
        return action.payload.map((el, index) => {
          return {
            id: index,
            lat: el.lat,
            lon: el.lon,
            centroid: [Number(el.lon), Number(el.lat)],
            elevation: 5000,
            display_name: el.display_name
          };
        });
      } else {
        return {
          ...action.payload
        };
      }
    default:
      return state;
  }
};

export default neededPlacesReducer;