export const CHANGE_GRID = "CHANGE_GRID";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const START_RUNNING = "START_RUNNING";
export const STOP_RUNNING = "STOP_RUNNING";
export const CHANGE_COLOR = "CHANGE_COLOR";

export const handleChangeGrid = (size) => (dispatch) => {
  console.log("dispatching grid change");

  dispatch({ type: CHANGE_GRID, payload: parseInt(size) });
};

export const startSimulation = () => (dispatch) => {
  console.log("dispatching start change");

  dispatch({ type: START_RUNNING });
};
export const stopSimulation = () => (dispatch) => {
  console.log("dispatching stop change");

  dispatch({ type: STOP_RUNNING });
};
