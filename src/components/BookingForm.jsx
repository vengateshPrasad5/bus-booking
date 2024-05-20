import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BookingForm({ selectedSeats, search }) {
  const navigate = useNavigate();
  const [passengerInfo, setPassengerInfo] = useState([]);
  const inputWidth = { width: 250 };
  const handleInputChange = (index, field, value) => {
    // const newPassenger = passengerInfo.map((seat, idx) =>
    //   idx === index ? { ...seat, [field]: value } : seat
    // );
    // setPassengerInfo(newPassenger);
  };
  return (
    <div className="text-align-center">
      <h5>
        {search.from} To {search.to}
      </h5>
      <h6>{search.date}</h6>
      <h5>Add Passenger Info</h5>
      {selectedSeats.map((seat, index) => (
        <div key={index}>
          <div className="mx-5 mb-2">Seat: {seat}</div>
          <Form.Group className="d-flex justify-content-start align-items-center flex-wrap mx-5">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              className="m-3"
              style={inputWidth}
              type="text"
              maxLength={25}
              onChange={(e) => handleInputChange(seat, "name", e.target.value)}
            ></Form.Control>
            <Form.Label>Age:</Form.Label>
            <Form.Control
              className="m-3"
              style={inputWidth}
              type="text"
              maxLength={2}
              onChange={(e) => handleInputChange(seat, "age", e.target.value)}
            ></Form.Control>
            <Form.Label>Gender:</Form.Label>
            <Button
              variant={
                passengerInfo.gender === "Male" ? "primary" : "outline-primary"
              }
              onClick={() => handleInputChange(seat, "gender", "Male")}
              className="m-1"
            >
              Male
            </Button>
            <Button
              variant={
                passengerInfo.gender === "Female"
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => handleInputChange(seat, "gender", "Female")}
              className="m-1"
            >
              Female
            </Button>
          </Form.Group>
        </div>
      ))}
    </div>
  );
}

export default BookingForm;
