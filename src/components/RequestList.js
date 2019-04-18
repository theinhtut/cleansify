import React from 'react';
import { connect } from 'react-redux';
import RequestListItem from './RequestListItem'

const RequestList = (props) => (
    <div>
        <h1>Request List</h1>
        {props.requests.map((request) => {
            return <RequestListItem key={request.id} {...request}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    };
};

export default connect(mapStateToProps)(RequestList);