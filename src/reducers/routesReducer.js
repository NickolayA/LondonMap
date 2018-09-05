import { ADD_FOUNDED_PATH } from "../actions/types";

const routesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FOUNDED_PATH:
      console.log("routesReducer");
      return action.payload;
    default:
      return state;
  }
};

export default routesReducer;
