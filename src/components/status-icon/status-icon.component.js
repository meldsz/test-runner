import React from 'react';
import constants from '../../utils/constants';

const StatusIcon = (props) => {
    const { RUNNING, PASSED, FAILED, DONE } = constants.status;
    let iconName = '';
    let color = '';

    switch (props.status) {
        case PASSED:
            iconName = 'done';
            color = 'green-text';
            break;
        case FAILED:
            iconName = 'close';
            color = 'red-text';
            break;
        case RUNNING:
            iconName = 'schedule';
            color = 'light-blue-text';
            break;
        case DONE:
            iconName = 'done_all';
            color = 'green-text';
            break;
        default:
            iconName = 'not_interested';
            color = 'grey-text';
            break;
    }
    return <i className={`material-icons ${color}`}>{iconName}</i>
}

export default StatusIcon;