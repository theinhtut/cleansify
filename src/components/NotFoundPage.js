import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="content-container">
    <div className="not-found">
      <img className="not-found__icon" src="/images/404.png" />
        <br/>
      <div className="not-found__subtitle">
        Oops! The page you are looking for does not exist.
      </div>
      <br/>
      <br/>
      <div>
        <Link className="button" to="/">
          Go Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
