import React, { useState } from "react";
import "../../index.css";
import "./LoginSignup.css";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user_icon} alt="user icon " />
              <input type="text" placeholder="Username" />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="email icon " />
            <input type="email" placeholder="Email" />
          </div>

          <div className="input">
            <img src={password_icon} alt="password icon" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="submit-container">
          <button
            className={`submit ${action === "Login" ? "gray" : ""}`}
            onClick={() => setAction("Sign Up")}
            disabled={action === "Sign Up"} 
          >
            Sign Up
          </button>

          <button
            className={`submit ${action === "Sign Up" ? "gray" : ""}`}
            onClick={() => setAction("Login")}
            disabled={action === "Login"} 
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
