import React from 'react';
//import { connect } from 'react-redux';
import RequestForm from './RequestForm';
//import { addRequest } from '../actions/requests';

const AddRequestPage = props => (
  <div>
    <h3>This is Add Request Page</h3>
    <RequestForm
      onSubmit={request => {
        console.log('dddd');
      }}
    />
  </div>
);

export default AddRequestPage;
