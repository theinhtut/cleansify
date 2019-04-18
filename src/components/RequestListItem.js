import React from 'react';

const RequestListItem = ({ email, location, date }) => (
    <div>
        <h4>{email}</h4>
        <p>{location} - {date}</p>
    </div>
);

export default RequestListItem;