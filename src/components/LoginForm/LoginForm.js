import React, { useState } from "react";
import "./LoginForm.css"; // Ensure you create corresponding CSS files or include styles in App.css
import sjecLogo from "../../images/sjec-logo.png";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "", role: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    if (!role) {
      newErrors.role = "Please select a role.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();

        if (response.status === 200) {
          setIsLoggedIn(true);
          setLoginMessage(data.message);
          setIsPopupActive(false);
          if (role === 'admin') {
            navigate('/'); // Redirect to Dashboard
          } else if (role === 'faculty') {
            navigate('/facultyDash'); // Redirect to FacultyDash
          }
          else if (role === 'committee member') {
            navigate('/');
          } 
          else {
            setLoginMessage('Unauthorized role.');
          }
        } else {
          setLoginMessage(data.message);
        }
      } catch (error) {
        setLoginMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <header>
        <div className="header-content">
          <img src={sjecLogo} style={{ height: "90px" }} alt="Sjec Logo" />
          <h2 className="logo">Publication Assessment System</h2>
        </div>
        <button
          className="btnlogin-popup"
          onClick={() => setIsPopupActive(true)}
        >
          Login
        </button>
      </header>
      {isPopupActive && (
        <div className="wrapper active-popup">
          <span className="icon-close" onClick={() => setIsPopupActive(false)}>
            <ion-icon name="close"></ion-icon>
          </span>
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="drop-box">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled selected></option>
                  <option value="admin">Admin</option>
                  <option value="principal">Principal</option>
                  <option value="committee member">Committee Member</option>
                  <option value="faculty">Faculty</option>
                </select>
                <label className="select-label">Role</label>
                {errors.role && (
                  <div style={{ color: "red" }}>{errors.role}</div>
                )}
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label style={{ color: "grey" }}>Email</label>
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="key"></ion-icon>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label style={{ color: "grey" }}>Password</label>
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      {loginMessage && (
        <div className={`login-message ${isLoggedIn ? "success" : "error"}`}>
          {loginMessage}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
