import React from 'react';
import { connect } from 'react-redux';
import RequestListItem from './RequestListItem';

export const RequestList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Job Requests</div>
      <div className="show-for-desktop">Job Request</div>
      <div className="show-for-desktop">Vendors By</div>
    </div>

    <div className="list-body">
      {props.requests.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No job requests</span>
        </div>
      ) : (
        props.requests.map(request => {
          return <RequestListItem key={request.id} {...request} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    requests: state.requests
  };
};

export default connect(mapStateToProps)(RequestList);
