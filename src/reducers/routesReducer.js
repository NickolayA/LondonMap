import { ADD_FOUNDED_PATH, LOOKING_FOR_PATH, CLEAR_PATH } from "../actions/types";

const routesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKING_FOR_PATH:
      return {
        loading: true
      };

    case ADD_FOUNDED_PATH:
      return action.payload;

    case CLEAR_PATH:
      return {};

    default:
      return state;
  }
};

export default routesReducer;
