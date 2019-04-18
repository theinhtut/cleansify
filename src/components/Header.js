import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (
    <div>
        <h1>Cleansify</h1>
        <NavLink to="/" exact={true}>Dashboard</NavLink>
        <NavLink to="/create">Request</NavLink>
    </div>
);

export default Header;