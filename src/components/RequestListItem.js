import React from 'react';
import moment from 'moment';

const RequestListItem = ({ email, location, date }) => (
    <div>
        <h4>{email}</h4>
        <p>{location} - {moment(date).format('Do MMMM YYYY')}</p>
    </div>
);

export default RequestListItem;