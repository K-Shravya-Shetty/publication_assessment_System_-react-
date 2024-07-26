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


import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import logo from './images/sjec-logo.png';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
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
      <div className="widgets">
        <div className="widget">
          <Link to="/viewApplication" className="widget-link">
            View Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
