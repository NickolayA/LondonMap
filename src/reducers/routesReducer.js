import { ADD_START_STOP_POINTS_PAIR } from "../actions/types";

const routesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_START_STOP_POINTS_PAIR:
      console.log("routesReducer");
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default routesReducer;
