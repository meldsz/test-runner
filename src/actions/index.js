export const SET_TEST_STATUS = 'SET_TEST_STATUS';
export const SET_EXEC_STATUS = 'SET_EXEC_STATUS';
export const SET_CURR_STATUS = 'SET_CURR_STATUS';

export function setTestStatus(testStatus = []) {
    return {
        type: SET_TEST_STATUS,
        testStatus
    }
}

export function setExecutionStatus(executionStatus = '') {
    return {
        type: SET_EXEC_STATUS,
        executionStatus
    }
}
export function setCurrentStatus(currentStatus = {}) {
    return {
        type: SET_CURR_STATUS,
        currentStatus
    }
}