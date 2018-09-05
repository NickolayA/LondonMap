import { ADD_FOUNDED_PATH, LOOKING_FOR_PATH } from "../actions/types";

const routesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKING_FOR_PATH:
      return { loading: true };

    case ADD_FOUNDED_PATH:
      console.log("routesReducer");
      return action.payload;
    default:
      return state;
  }
};

export default routesReducer;
