import React, { useEffect, useState } from "react";
import { getUserProfile } from "../service/authService";
import Loader from "./Loader";
import ChangePassword from "./ChangePassword";

function UserProfile() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const role =
    sessionStorage.getItem("role") === "ROLE_USER" ? "USER" : "ADMIN";

  const handleChangePassword = () => {
    console.log("Clicked");
  };

  const getProfile = async () => {
    setLoading(true);
    const userName = sessionStorage.getItem("authenticatedUser");
    try {
      const response = await getUserProfile(userName);
      setUser(response.data.userName);
      setEmail(response.data.emailId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row ">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-center">User Profile</h2>
                </div>
                <div className="card-body ">
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Username</label>
                    <div className="col-md-9">{user}</div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Email</label>
                    <div className="col-md-9">{email}</div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label">Role</label>
                    <div className="col-md-9">{role}</div>
                  </div>
                  <div className="form-group mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setModalShow(true)}
                    >
                      Change Password
                    </button>
                    <ChangePassword
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
