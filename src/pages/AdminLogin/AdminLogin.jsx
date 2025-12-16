import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error-msg">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Admin Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
           <span className="toggle-icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
