import React, { useState } from "react";
import {
  isUserLoggedIn,
  getLoggedInUser,
  logout,
} from "../service/authService";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = isUserLoggedIn();
  const userName = getLoggedInUser();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href=""
          onClick={() => {
            navigate("/");
          }}
        >
          Bus Booking App
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        {isAuth ? (
          <li className="navbar-nav nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              role="button"
              onClick={() => toggleDropdown()}
              aria-expanded={isOpen ? "true" : "false"}
            >
              Welcome {userName}
            </a>
            <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/userProfile")}
                >
                  UserProfile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigate("/bus/bookingHistory")}
                >
                  Booking History
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    navigate("/");
                    alert("Logged out Successfully");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        ) : (
          <a className="nav-link" onClick={() => navigate("/login")}>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
