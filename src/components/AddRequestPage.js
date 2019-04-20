import React from 'react';
import { connect } from 'react-redux';
import RequestForm from './RequestForm';
import { startAddRequest } from '../actions/requests';

export class AddRequestPage extends React.Component {
  onSubmit = request => {
    this.props.startAddRequest(request);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Cleaning Request</h1>
          </div>
        </div>

        <div className="content-container">
          <RequestForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddRequest: request => dispatch(startAddRequest(request))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddRequestPage);
