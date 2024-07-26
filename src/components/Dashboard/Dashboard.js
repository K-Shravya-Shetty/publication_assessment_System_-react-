import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import logo from './images/sjec-logo.png';

const Dashboard = () => {
  return (
    <div className="nav">
      <ul id="list">
        <li className="logo">
          <img src={logo} alt="SJEC Logo" style={{ height: '50px' }} />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/newApplication">New Application</Link>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
