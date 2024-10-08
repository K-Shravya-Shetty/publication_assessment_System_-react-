import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import '../Dashboard/Dashboard.css';
import logo from '../Dashboard/images/sjec-logo.png';
import '../Dashboard/css/bootstrap-4.0.0-dist/css/bootstrap.min.css';

const FacultyDash = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from the backend
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleView = (filename) => {
    window.open(`http://localhost:3001/file/${filename}`);
  };

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
                  <thead>
                    <tr className="bg"> 
                      <td> Application No. </td> 
                      <td> Title </td> 
                      <td> Status </td>
                      <td> View </td>
                    </tr> 
                  </thead>
                  <tbody>
                    {applications
                      .filter((application) => application.status !== 'Approved')
                      .map((application, index) => (
                        <tr key={application._id}>
                          <td>{index + 1}</td>
                          <td>{application.filename}</td>
                          <td>{application.status || 'Pending'}</td>
                          <td>
                            <button onClick={() => handleView(application.filename)}>View</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
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
