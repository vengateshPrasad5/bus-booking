import React, { useContext, useState } from "react";

function Navbar() {
  // const{isUserLoggedIn} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Bus Booking App
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <a className="nav-link">Sign In</a>
        <li className="navbar-nav nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            role="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen ? "true" : "false"}
          >
            Welcome Username
          </a>
          <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
            <li>
              <a className="dropdown-item" href="#">
                UserProfile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Booking History
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
}

export default Navbar;
