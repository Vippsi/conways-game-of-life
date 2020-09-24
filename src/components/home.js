import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { connect } from "react-redux";
import { handleChangeGrid, startSimulation } from "../actions";
import Grid from "../components/grid/grid";
import "../App.css";

const Home = (props) => {
  const defaultSize = {
    size: props.size,
  };

  useEffect(() => {
    setRunning(false);
    setSimRunning(false);
    setStepRunning(false);
    setGenRunning(false);
  }, []);

  const [running, setRunning] = useState(props.isRunning);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [simRunning, setSimRunning] = useState(props.isRunning.simRun);
  const simRunningRef = useRef(simRunning);
  simRunningRef.current = simRunning;

  const [stepRunning, setStepRunning] = useState(props.isRunning.stepRun);
  const stepRunningRef = useRef(stepRunning);
  stepRunningRef.current = stepRunning;

  const [genRunning, setGenRunning] = useState(props.isRunning.genRun);
  const genRunningRef = useRef(genRunning);
  genRunningRef.current = genRunning;

  const [clear, setClear] = useState(false);
  const clearRef = useRef(clear);
  clearRef.current = clear;

  const [random, setRandom] = useState(false);
  const randomRef = useRef(random);
  randomRef.current = random;

  const [gridSize, setGridSize] = useState(defaultSize);

  const defaultValues = {
    generation: 0,
  };

  const [hiddenGen, setHiddenGen] = useState(defaultValues);

  const handleChanges = (e) => {
    setGridSize({ ...gridSize, [e.target.name]: e.target.value });
  };

  const submitChanges = (size) => {
    // if (size > 25) {
    //   size = 25;
    // }
    props.handleChangeGrid(size);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGenRunning(!genRunning);
    if (!genRunning) {
      genRunningRef.current = true;
    }
    setHiddenGen(defaultValues);
  };

  const onHandleChanges = (e) => {
    setHiddenGen({ ...hiddenGen, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="homeDiv">
        <div className="optionsDiv">
          <h2>The Game of Life!</h2>

          <input value={gridSize.height} onChange={handleChanges} name="size" />
          <button
            onClick={() => {
              submitChanges(gridSize.size);
            }}
          >
            Change Size
          </button>

          <button
            className="gridButton"
            onClick={() => {
              setSimRunning(!simRunning);
              if (!simRunning) {
                simRunningRef.current = true;
                console.log(running.simRun, simRunningRef);
              }
              // runSim();
            }}
          >
            {simRunning ? "Stop Simulation" : "Start Simulation"}
          </button>

          <button
            className="gridButton"
            onClick={() => {
              setClear(!clear);
              if (!clear) {
                clearRef.current = true;
              }
            }}
          >
            Clear Grid
          </button>

          <button
            className="gridButton"
            onClick={() => {
              setRandom(!random);
              if (!random) {
                randomRef.current = true;
              }
            }}
          >
            Random Grid
          </button>

          <button
            className="gridButton"
            onClick={() => {
              console.log(stepRunning);
              setStepRunning(!stepRunning);
              if (!stepRunning) {
                stepRunningRef.current = true;
              }
            }}
          >
            step Gen
          </button>

          <button
            className="gridButton"
            onClick={() => {
              setGenRunning(!genRunning);
              if (!genRunning) {
                genRunningRef.current = true;
              }
            }}
          >
            Generate Gen
          </button>

          <form onSubmit={handleSubmit}>
            <input
              value={hiddenGen.generation}
              onChange={onHandleChanges}
              name="generation"
            />
            <button
              onClick={() => {
                setGenRunning(!genRunning);
                if (!genRunning) {
                  genRunningRef.current = true;
                }
              }}
            >
              GENERATE
            </button>
          </form>

          <div>
            <ul className="rulesUl">
              <h2>Rules:</h2>
              <li>
                Living cells that have two or three neighbors will remain alive
                in the next generation.
              </li>
              <li>
                Living cells with less than two neighbors will die due to
                underpopulation.
              </li>
              <li>
                Living cells with more than three neighbors will die due to
                overpopulation.
              </li>
              <li>
                Cells that are not alive, but have three living neighbors will
                be brought to life due to reproduction.
              </li>
            </ul>
          </div>
        </div>

        <div className="bigGridDivContainer">
          <Grid
            runningRef={runningRef}
            running={running}
            setRunning={setRunning}
            simRunningRef={simRunningRef}
            simRunning={simRunning}
            setSimRunning={setSimRunning}
            stepRunningRef={stepRunningRef}
            stepRunning={stepRunning}
            setStepRunning={setStepRunning}
            genRunningRef={genRunningRef}
            genRunning={genRunning}
            setGenRunning={setGenRunning}
            hiddenGen={hiddenGen}
            setHiddenGen={setHiddenGen}
            clear={clear}
            setClear={setClear}
            random={random}
            setRandom={setRandom}
          />
        </div>
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

export default connect(mapStateToProps, { handleChangeGrid, startSimulation })(
  Home
);
