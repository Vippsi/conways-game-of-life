export const CHANGE_GRID = "CHANGE_GRID";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const START_RUNNING = "START_RUNNING";
export const STOP_RUNNING = 'STOP_RUNNING'
export const CHANGE_COLOR = "CHANGE_COLOR";

export const handleChangeGrid = (width, height) => (dispatch) => {
  dispatch({ type: CHANGE_GRID, payload: width, height });
};
