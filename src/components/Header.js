import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
      <a href="/"><img className="header__logo" src="/images/logo.png" alt="HTML tutoria" /></a>
        <Link className="header__title" to="/">
          <h1>Cleansify</h1>
        </Link>
        <Link className="button button--secondary" to="/create">Request</Link>
      </div>
    </div>
  </header>
);

export default Header;
