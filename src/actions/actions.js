import { CHANGE_VIEWPORT } from "./types";

export const changeViewport = newViewport => {
  return {
    type: CHANGE_VIEWPORT,
    payload: newViewport
  };
};
