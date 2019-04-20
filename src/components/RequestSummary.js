import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export const RequestSummary = ({ requestCount }) => {
  const requestWord = requestCount === 1 ? 'request' : 'requests';
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
           You have <span>{requestCount}</span> job {requestWord} in total.
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        requestCount: state.requests.length
    };
};

export default connect(mapStateToProps)(RequestSummary);
