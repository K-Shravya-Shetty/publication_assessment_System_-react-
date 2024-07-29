import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import logo from "./images/sjec-logo.png";
import "./css/bootstrap-4.0.0-dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch application data from the backend
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/applications');
        const data = await response.json();
        console.log('Fetched applications:', data); // Log the fetched data
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error); // Log any errors
      }
    };

    fetchApplications();
  }, []);

  const handleView = (filename) => {
    window.open(`http://localhost:3001/file/${filename}`);
  };
  const handleApprove = async (id) => {
    try {
      console.log(`Approving application with ID: ${id}`);
      const response = await fetch(`http://localhost:3001/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Approved' }),
      });
  
      if (response.ok) {
        const updatedApplication = await response.json();
        console.log('Updated application:', updatedApplication);
  
        // Update state with the new application status
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === id ? { ...app, status: 'Approved' } : app
          )
        );
      } else {
        console.error('Error approving application:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };
  

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
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className="display-6 text-center">New Applications</h2>
              </div>
              <div className="card-body">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr className="bg">
                      <th>Application No.</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Action</th>
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
                          <td>
                            <button onClick={() => handleApprove(application._id)}>Approve</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="display-6 text-center">Approved Applications</h2>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr className="bg">
                      <th>Application No.</th>
                      <th>Title</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications
                      .filter((application) => application.status === 'Approved')
                      .map((application, index) => (
                        <tr key={application._id}>
                          <td>{index + 1}</td>
                          <td>{application.filename}</td>
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

export default Dashboard;
