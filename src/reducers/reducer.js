import {
  CHANGE_SPEED,
  CHANGE_GRID,
  START_RUNNING,
  STOP_RUNNING,
  CHANGE_COLOR,
} from "../actions";

const initialState = {
  size: 25,
  isRunning: {
    simRun: false,
    stepRun: false,
    genRun: false,
  },
  cellColor: "blue",
  speed: 1000,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_GRID:
      return {
        ...state,
        size: action.payload,
      };

    default:
      return state;
  }
};
