import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/Dashboard.css';
import logo from '../Dashboard/images/sjec-logo.png';
import '../Dashboard/css/bootstrap-4.0.0-dist/css/bootstrap.min.css';

const FacultyDash = () => {
  return (
    <div className="dashboard-container">
      <link rel='stylesheet' href='css/bootstrap.min.css'></link>
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
            <Link to="/LoginForm">Logout</Link>
          </li>
        </ul>
      </div>
      
      <div className="container"> 
        <div className="row mt-5"> 
          <div className="col"> 
            <div className="card mt-5"> 
              <div className="card-header"> 
                <h2 className="display-6 text-center">Your Applications</h2>
              </div> 
              <div className="card-body"> 
                <table className="table table-bordered text-center"> 
                  <tr className="bg"> 
                    <td> Application No. </td> 
                    <td> Title </td> 
                    <td> Status </td>
                    <td> View </td>
                    <td> Action </td>
                  </tr> 
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDash;
