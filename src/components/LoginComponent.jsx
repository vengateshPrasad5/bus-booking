import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../service/authService";
import Loader from "./Loader";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAPICall(username, password);
      const token = "Bearer " + response.data.accessToken;
      storeToken(token);
      saveLoggedInUser(
        response.data.userName,
        response.data.role,
        response.data.userId
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> Login Form </h2>
            </div>
            {isLoading && <Loader className="col" />}
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Email Id</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Password </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Submit
                  </button>
                  <a
                    href=""
                    className="mx-3"
                    onClick={() => navigate("/register")}
                  >
                    new user!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
