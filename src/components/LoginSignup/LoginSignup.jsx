import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginSignup.css";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { AuthContext } from "../Global/common";
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;

    if (!email || !password || (action === "Sign Up" && !username)) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      email,
      password,
      ...(action === "Sign Up" && { username }),
    };

    const endpoint =
      action === "Sign Up"
        ? "http://localhost:8080/api/auth/signup"
        : "http://localhost:8080/api/auth/login";

    try {
      const response = await axios.post(endpoint, payload);
      if (response.status === 200) {
        const token = response.data.data?.accessToken || response.data.token;

        if (token) {
          localStorage.setItem("accessToken", token);
          setAccessToken(token);
          alert(`${action} successful.`);
          setFormData({ username: "", email: "", password: "" });

          // Optional: redirect to protected page
          // navigate("/dashboard");
        } else {
          alert("Access token missing in response.");
        }
      } else {
        alert(`Unexpected response: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      const message =
        error.response?.data || "An error occurred. Please try again.";
      alert(`${action} failed: ${message}`);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleSubmit}>
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="submit-container">
          <button type="submit" className="submit main-submit">
            {action}
          </button>

          <button
            type="button"
            className="submit toggle-button"
            onClick={() =>
              setAction((prev) => (prev === "Login" ? "Sign Up" : "Login"))
            }
          >
            {action === "Login" ? "Switch to Sign Up" : "Switch to Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignupForm;
