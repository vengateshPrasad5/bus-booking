import React, { useState } from "react";
import { registerAPICall } from "../service/authService";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function handleRegistrationForm(e) {
    e.preventDefault();
    setLoading(true);
    const register = { userName: username, emailId: email, password: password };

    try {
      const response = await registerAPICall(register);
      setSuccessMsg(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  }

  return (
    <div className="position-relative">
      <Loader className="d-flex align-items-center justify-content-center" />
      <div className="container">
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">User Registration Form</h2>
              </div>
              <div className="card-body ">
                <form>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Username</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Email</label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Password</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleRegistrationForm(e)}
                    >
                      {isLoading && (
                        <Loader className="position-absolute top-50 start-50 translate-middle" />
                      )}
                      Submit
                    </button>
                    <a
                      href=""
                      className="mx-3"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      already a user?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
