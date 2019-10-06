import { SET_EXEC_STATUS, SET_TEST_STATUS, SET_CURR_STATUS } from '../actions/index';
import { combineReducers } from 'redux';
import constants from '../utils/constants';

function testStatus(state = [], action) {
    switch (action.type) {
        case SET_TEST_STATUS:
            return action.testStatus;
        default:
            return state;
    }
}

function executionStatus(state = constants.status.NOT_STARTED, action) {
    switch (action.type) {
        case SET_EXEC_STATUS:
            return action.executionStatus;
        default:
            return state;
    }
}
function currentStatus(state = {}, action) {
    switch (action.type) {
        case SET_CURR_STATUS:
            return action.currentStatus;
        default:
            return state;
    }
}

export default combineReducers({ executionStatus, testStatus, currentStatus });