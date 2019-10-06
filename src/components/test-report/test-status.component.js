import React from 'react';
import { connect } from 'react-redux';
import constants from '../../utils/constants';
import './test-status.component.css'

const Card = (props) => {
    const { status, color, count } = props;
    return (
        <div className={`card lighten-1 ${color}`}>
            <div className="card-content white-text content-container">
                <span className="card-title card-text">
                    <strong>{count ? count : 0}</strong>
                </span>
                <p>{status.toUpperCase()}</p>
            </div>
        </div>
    );
}

const TestStatus = (props) => {
    const { running, passed, failed } = props.currentStatus;
    return (
        <div>
            <div className="col card-container">
                <Card color="orange" status={constants.status.RUNNING} count={running} />
                <Card color="green" status={constants.status.PASSED} count={passed} />
                <Card color="red" status={constants.status.FAILED} count={failed} />
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    currentStatus: state.currentStatus
});

export default connect(mapStateToProps, null)(TestStatus);