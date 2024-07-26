import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { changePassword, getLoggedInUser } from "../service/authService.js";
import SmallLoader from "./SmallLoader.jsx";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const userName = getLoggedInUser();

  const handlePassword = async () => {
    const obj = {
      userName: userName,
      currentPwd: currentPassword,
      newPwd: newPassword,
    };
    setLoading(true);
    try {
      const response = await changePassword(obj);
      console.log(response.data);
      alert(response.data);
      navigate("/userProfile");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <label className="col-md-3 control-label">Current Password</label>
          <div className="col-md-9">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-3 control-label">New Password</label>
          <div className="col-md-9">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isLoading && <SmallLoader />}
        <Button
          onClick={() => {
            handlePassword();
            props.onHide;
          }}
          disabled={isLoading == true}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
