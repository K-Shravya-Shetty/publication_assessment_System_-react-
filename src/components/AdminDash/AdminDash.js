import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDash.css';
import '../Dashboard/Dashboard.css'; 
import logo from '../Dashboard/images/sjec-logo.png';

export default function AdminDash() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/getUsers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    // window.location.href = './LoginForm'; // Adjust path as needed
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteUser/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

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
            <Link to="/LoginForm">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ width: 'auto' }}>
        <h1>Admin Dashboard</h1>
          <h3>USERS</h3>
          {error && <p>Error: {error}</p>}
          <table style={{ width: 500 }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
}

