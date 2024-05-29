import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BookingForm({ selectedSeats, search }) {
  const navigate = useNavigate();

  const [passengerList, setPassengerList] = useState(
    selectedSeats.reduce((acc, seat, index) => {
      acc[seat] = {
        id: index + 1,
        seatId: seat,
        name: "",
        age: "",
        gender: "",
      };
      return acc;
    }, {})
  );

  const handleInputChange = (seat, field, value) => {
    setPassengerList((prevList) => ({
      ...prevList,
      [seat]: { ...prevList[seat], [field]: value },
    }));
  };
  return (
    <div className="text-align-center m-2">
      <h5>
        {search.from} To {search.to}
      </h5>
      <h6>{search.date}</h6>
      <h5 className="mx-2">Add Passenger Info</h5>
      {selectedSeats.map((seat, index) => (
        <div key={index}>
          <div className="mx-5 mb-2">Seat: {seat}</div>
          <Form.Group className="d-flex justify-content-start align-items-center flex-wrap mx-5">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              className="m-3"
              style={{ width: 250 }}
              type="text"
              maxLength={25}
              onChange={(e) => handleInputChange(seat, "name", e.target.value)}
            ></Form.Control>
            <Form.Label>Age:</Form.Label>
            <Form.Control
              className="m-3"
              style={{ width: 80 }}
              type="number"
              maxLength={2}
              onChange={(e) => handleInputChange(seat, "age", e.target.value)}
            ></Form.Control>
            <Form.Label>Gender:</Form.Label>
            <Button
              variant={
                selectedSeats[index] === seat &&
                passengerList[seat].gender === "Male"
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => handleInputChange(seat, "gender", "Male")}
              className="m-1"
            >
              Male
            </Button>
            <Button
              variant={
                selectedSeats[index] === seat &&
                passengerList[seat].gender === "Female"
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
      <Button onClick={() => navigate("/")}>Book Now</Button>
    </div>
  );
}

export default BookingForm;
