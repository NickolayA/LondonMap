import { ADD_NEEDED_PLACES, FILTER_CHECKED_PLACE } from "../actions/types";

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
            elevation: 2500,
            displayName: el.display_name,
            color: "color" in el ? el.color : [140, 140, 140]
          };
        });
      } else {
        return {
          ...action.payload
        };
      }
    case FILTER_CHECKED_PLACE:
      const neededPlacesLength = state.length;
      return state.filter((el, index) => {
        if (index === action.payload || index + 1 === neededPlacesLength) {
          return el;
        }
      });
    default:
      return state;
  }
};

export default neededPlacesReducer;
