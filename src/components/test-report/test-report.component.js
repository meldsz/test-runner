import React from 'react';
import { connect } from 'react-redux';
import StatusIcon from '../status-icon/status-icon.component';

const TestReport = (props) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Test Description</th>
                        <th className="center-align">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {props.testStatus.map((row, index) =>
                        <tr key={index}>
                            <td>{row.description}</td>
                            <td className="center-align">
                                <StatusIcon status={row.status} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}
const mapStateToProps = (state) => ({ testStatus: state.testStatus });

export default connect(mapStateToProps, null)(TestReport);;