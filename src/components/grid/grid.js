import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import produce from "immer";
import { presets } from "./presets";
import { handleChangeGrid } from "../../actions";
import "../../App.css";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Grid = ({
  size,
  runningRef,
  running,
  setRunning,
  simRunningRef,
  simRunning,
  setSimRunning,
  stepRunning,
  stepRunningRef,
  setStepRunning,
  genRunningRef,
  genRunning,
  setGenRunning,
  hiddenGen,
  setHiddenGen,
  clear,
  setClear,
  random,
  setRandom,
  handleChangeGrid,
  speed,
}) => {
  let numCols = size;
  let numRows = size;

  console.log(speed);

  const colsRef = useRef(numCols);
  colsRef.current = numCols;
  const rowsRef = useRef(numRows);
  rowsRef.current = numRows;

  const [toggled, setToggled] = useState(false);

  const defaultPreset = {
    name: "",
  };

  const [presetArr, setPresetArr] = useState(presets);

  const [newPreset, setNewPreset] = useState(defaultPreset);

  const handleChanges = (e) => {
    setNewPreset({ ...newPreset, [e.target.name]: e.target.value });
  };

  const [gridTemplate, setGridTemplate] = useState();

  useEffect(() => {
    setGrid(() => {
      if (gridTemplate === undefined) {
        return;
      }
      let grid = gridTemplate;
      for (const [key, value] of Object.entries(gridTemplate)) {
        if (key === "Grid") {
          grid = value;
        }
      }
      return grid;
    });
  }, [gridTemplate, toggled]);

  const [gen, setGen] = useState(0);
  const genRef = useRef(gen);
  genRef.current = gen;

  useEffect(() => {
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < rowsRef.current; i++) {
        rows.push(Array.from(Array(colsRef.current), () => 0));
      }
      return rows;
    });
    colsRef.current = size;
    rowsRef.current = size;
  }, [size]);

  // Init grid
  let [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowsRef.current; i++) {
      rows.push(Array.from(Array(colsRef.current), () => 0));
    }
    return rows;
  });

  const speedRef = useRef(speed);
  speedRef.current = speed;

  // simulate
  const runSim = useCallback(() => {
    let newSpeed = speed;
    if (
      !simRunningRef.current &&
      !stepRunningRef.current &&
      !genRunningRef.current
    ) {
      return;
    }
    setGen((genRef.current += 1));

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rowsRef.current; i++) {
          for (let k = 0; k < colsRef.current; k++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < rowsRef.current &&
                newK >= 0 &&
                newK < colsRef.current
              ) {
                neighbours += g[newI][newK];
              }
            });
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbours === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSim, parseInt(speedRef.current));
  }, []);

  // console.log(grid);
  // Makes a preset grid and saves it to state
  const makePreset = (name, grid) => {
    const presetObj = { Name: name, Grid: grid };
    console.log(presetObj);

    setPresetArr([...presetArr, presetObj]);
  };

  // Toggles running main Sim
  useEffect(() => {
    if (simRunning) {
      runSim();
    }
  }, [simRunning]);

  // Button Functions
  const clearGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsRef.current; i++) {
      rows.push(Array.from(Array(colsRef.current), () => 0));
    }
    return rows;
  };
  // Toggles Clear Grid
  useEffect(() => {
    if (clear) {
      setGrid(clearGrid());
      setGen((genRef.current = 0));
      setSimRunning(false);
      setGenRunning(false);
      setStepRunning(false);
      // setClear(false);
    }
  }, [clear]);

  // Toggles Random Grid
  useEffect(() => {
    if (random) {
      const rows = [];
      for (let i = 0; i < rowsRef.current; i++) {
        rows.push(
          Array.from(Array(colsRef.current), () =>
            Math.random() > 0.7 ? 1 : 0
          )
        );
      }
      setGrid(rows);
    }
    setRandom(false);
  }, [random]);

  // This gets the gen for the current input
  const getGen = useCallback(
    (gen) => {
      while (genRef.current < gen) {
        runSim();
      }
      setGenRunning(false);

      setTimeout(0.1);
    },
    [runSim]
  );
  // Toggles Gen Running
  useEffect(() => {
    if (genRunning) {
      getGen(hiddenGen.generation);
    }
  }, [genRunning]);

  // this steps through the gens 1 by 1
  const stepGen = useCallback(
    (gen) => {
      runSim();
      setStepRunning(false);

      setTimeout(0.1);
    },
    [runSim]
  );

  //Toggles Stepping
  useEffect(() => {
    if (stepRunning) {
      stepGen();
    }
  }, [stepRunning]);


  if(size <= 50 && size >= 40) {
    size = 12
  }
  else if( size <= 40 && size > 25) {
    size = 15
  } else if(size === 25) {
     size += 3
  } else if (size < 25 && size >= 15) {
    size = 30
  } else if(size < 15){
    size = 35
  }
  

  return (
    <div className="gridDivContainer">
      <p>{genRef.current}</p>

      <input
        value={newPreset.name}
        onChange={handleChanges}
        name="name"
        placeholder="Preset Name"
      />
      <button
        className="gridButton"
        onClick={() => {
          makePreset(newPreset.name, grid);
          setNewPreset(defaultPreset);
        }}
      >
        save preset
      </button>
      <h3>Presets:</h3>
      <div className="presetButtons">
        {presetArr.map((preset) => (
          <button
            className="presetButton"
            key={preset.Name}
            onClick={async (e) => {
              await handleChangeGrid(25);
              setGridTemplate(preset);
              setToggled(!toggled);
            }}
          >
            {preset.Name}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colsRef.current}, ${size + 1}px)`,
          background:
            "linear-gradient(90deg, rgba(131,58,180,.5) 0%, rgba(253,29,29,.5) 50%, rgba(252,176,69,.5) 100%)",
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={
                simRunning || stepRunning || genRunning
                  ? {
                      pointerEvents: "none",
                      width: size,
                      height: size,
                      backgroundColor: grid[i][k]
                        ? "rgba(255,255,255, .3)"
                        : undefined,
                      border: "1.3px solid black",
                      boxShadow: "insert 0px 0px 20px 20px rgba(0,0,0,0.75)",
                    }
                  : {
                      width: size,
                      height: size,

                      background: grid[i][k]
                        ? "rgba(255,255,255, .5)"
                        : undefined,
                      border: "1.3px solid black",
                      boxShadow: " insert 0px 0px 20px 20px rgba(0,0,0,0.75)",
                    }
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    size: state.size,
    isRunning: state.isRunning,
  };
};
export default connect(mapStateToProps, { handleChangeGrid })(Grid);
