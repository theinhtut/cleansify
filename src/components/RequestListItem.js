import React from 'react';
import moment from 'moment';

const RequestListItem = ({ email, location, date, vendorName }) => (
  <div className="list-item">
    <div>
      <h3 className="list-item__title">{location}</h3>
      <span className="list-item__subtitle">
        Date: {moment(date).format('Do MMMM YYYY')}
      </span>
      <br />
      <span className="list-item__subtitle">E-mail: {email}</span>
    </div>
    <div />
    <h3 className="list-item__data">{vendorName}</h3>
  </div>
);

export default RequestListItem;
