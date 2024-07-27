// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Dashboard.css';
// import logo from './images/sjec-logo.png';

// const Dashboard = () => {
//   return (
//     <div className="nav">
//       <ul id="list">
//         <li className="logo">
//           <img src={logo} alt="SJEC Logo" style={{ height: '50px' }} />
//         </li>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/newApplication">New Application</Link>
//         </li>
//         <li>
//           <a href="#">Logout</a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import logo from "./images/sjec-logo.png";
import "./css/bootstrap-4.0.0-dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <link rel="stylesheet" href="css/bootstrap.min.css"></link>
      <div className="nav">
        <ul id="list">
          <li className="logo">
            <img src={logo} alt="SJEC Logo" style={{ height: "50px" }} />
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
      {/* <div className="widgets">
        <div className="widget">
          <Link to="/viewApplication" className="widget-link">
            View Application
          </Link>
        </div>
      </div> */}
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className="display-6 text-center">New Applications</h2>
              </div>
              <div className="card-body">
                <table className="table table-bordered text-center">
                  <tr className="bg">
                    <td> Application No. </td>
                    <td> Title </td>
                    <td> Status </td>
                    <td> View </td>
                    <td>Action</td>{" "}
                  </tr>
                  <tr>
                    <td>1323</td>
                    <td>hello</td>
                    <td>Pending</td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <button>Approve</button>
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <h2 className="display-6 text-center">Approved Applications</h2>
                <table className="table table-bordered text-center">
                  <tr className="bg">
                    <td> Application No. </td>
                    <td> Title </td>
                    <td> View </td>
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

export default Dashboard;
