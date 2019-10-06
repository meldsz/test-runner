import React, { useEffect } from 'react';
import './app.component.css';
import TestReport from '../test-report/test-report.component';
import TestStatus from '../test-report/test-status.component';
import StatusIcon from '../status-icon/status-icon.component';
import constants from '../../utils/constants';
import { connect } from 'react-redux';
import { setExecutionStatus, setTestStatus, setCurrentStatus } from '../../actions/index';

function App(props) {
  // input tests
  const makeDummyTest2 = () => new Promise(function (resolve, reject) {
    const delay = 7000 + Math.random() * 7000;
    const testPassed = Math.random() > 0.5;

    window.setTimeout(() => { resolve({ testPassed }) }, delay);

  });

  let tests = [
    { description: "uploads go in both directions", run: makeDummyTest2() },
    { description: "PDFs are adequately waterproof", run: makeDummyTest2() },
    { description: "videos are heated to 12,000,000 Kelvin", run: makeDummyTest2() },
    { description: "subpixels can go rock climbing", run: makeDummyTest2() },
    { description: "images are squarer than traffic cones", run: makeDummyTest2() },
    { description: "metaproperties don't go too meta", run: makeDummyTest2() },
  ];

  const { RUNNING, NOT_STARTED, PASSED, FAILED, DONE } = constants.status;

  // on component load assign the input tests data and status to the redux store
  useEffect(() => {
    const initialStatus = tests.map(test => ({
      description: test.description,
      status: NOT_STARTED
    }));
    // initialise the store with overall execution status
    props.setExecutionStatus(NOT_STARTED);
    // initialise the store with count of tests running/pass/fail based on their execution
    props.setCurrentStatus({ running: 0, passed: 0, failed: 0 });
    // initialise the store with the input tests
    props.setTestStatus([...initialStatus]);
  }, []);

  // update count of status type to the redux store whenever there is a change in the status of individual test 
  useEffect(() => {
    // store the count of status type in the redux store 
    let statusCounts = {};
    const initialStatus = props.testStatus.map(test => test.status.toLowerCase());
    initialStatus.forEach(type => statusCounts[type] = (statusCounts[type] || 0) + 1);
    props.setCurrentStatus(statusCounts);
  }, [props.testStatus]);

  // Process the input before execution to update the status during its execution
  const inputProcess = () => {
    const inputTests = [];
    // add a getter function to the individual test object to access the object properties
    for (let i = 0; i <= tests.length - 1; i++) {
      Object.defineProperty(tests[i], 'executeTest', {
        get: async function () {
          // change the individual test status to running when the execution starts
          props.testStatus[i].status = RUNNING;
          props.setTestStatus([...props.testStatus]);
          // execute the test
          const result = await this.run;
          // change the individual test status after its execution
          props.testStatus[i].status = result.status ? PASSED : FAILED;
          props.setTestStatus([...props.testStatus]);
          // update the overall status of the test suite
          const statusList = props.testStatus.map(test => test.status);
          statusList.includes(RUNNING) ?
            props.setExecutionStatus(RUNNING) : statusList.includes(NOT_STARTED) ?
              props.setExecutionStatus(NOT_STARTED) :
              props.setExecutionStatus(DONE);
          return result;
        }
      });
      inputTests.push(tests[i].executeTest);
    }
    return inputTests;
  }

  // update the status and execute the tests
  const startExecution = () => {
    try {
      props.setExecutionStatus(RUNNING);
      // execute all the tests in parallel
      Promise.all([inputProcess()]);
    } catch (err) {
      console.log("Error:", err);
    }

  }

  return (
    <div className="App">
      <div className="center-align App-header">Automated Test Runner</div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s1">
            {/* display the overall tests - execution status */}
            <div className="row execution-title">
              <div className="col">Execution Status:</div>
              <div className="col"><StatusIcon status={props.executionStatus} /></div>
              <div className="col">{props.executionStatus}</div>
            </div>
          </div>

          <div className="col s2 center-align">
            <button className="btn-large waves-effect waves-light" onClick={startExecution}>START</button>
          </div>
        </div>
        {/* display the test report and count of overall test execution status */}
        <div className="row">
          <div className="col s8 offset-s1">
            <TestReport />
          </div>
          <div className="col s2">
            <TestStatus />
          </div>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  testStatus: state.testStatus,
  executionStatus: state.executionStatus,
  currentStatus: state.currentStatus
});

export default connect(mapStateToProps, { setExecutionStatus, setTestStatus, setCurrentStatus })(App);