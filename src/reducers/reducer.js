import {
  CHANGE_SPEED,
  CHANGE_GRID,
  START_RUNNING,
  STOP_RUNNING,
  CHANGE_COLOR,
} from "../actions";

const initialState = {
  height: 25,
  width: 25,
  isRunning: false,
  cellColor: "blue",
  speed: 1000,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_RUNNING:
      return {
        ...state,
        isRunning: true,
      };
    case STOP_RUNNING:
      return {
        ...state,
        isRunning: false,
      };

    default:
      return state;
  }
};
