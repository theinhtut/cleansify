import React from 'react';
import { connect } from 'react-redux';
import RequestForm from './RequestForm';
import { startAddRequest } from '../actions/requests';

export class AddRequestPage extends React.Component {
  onSubmit = request => {
    this.props.startAddRequest(request);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h1>Add Cleaning Request</h1>
        <RequestForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddRequest: (request) => dispatch(startAddRequest(request))
    
});

export default connect(undefined, mapDispatchToProps)(AddRequestPage);
