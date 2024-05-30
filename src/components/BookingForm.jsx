import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../service/busService";

function BookingForm({ selectedSeats, search, selectedBus }) {
  const navigate = useNavigate();
  const [passengersList, setPassengersList] = useState(
    selectedSeats.reduce((acc, seat, index) => {
      acc[seat.seatId] = {
        id: index + 1,
        seatId: seat.seatId,
        name: "",
        age: "",
        gender: "",
      };
      return acc;
    }, {})
  );
  const handleInputChange = (seat, field, value) => {
    setPassengersList((prevList) => ({
      ...prevList,
      [seat]: { ...prevList[seat], [field]: value },
    }));
  };

  const handleBooking = async () => {
    console.log(selectedBus);
    const passengerList = Object.values(passengersList).map((passenger) => ({
      ...passenger,
    }));
    const obj = {
      reservationDate: selectedBus.departureDate,
      status: "Confirmed",
      userId: parseInt(sessionStorage.getItem("userId")),
      busId: selectedBus.busId,
      passengerList,
    };
    try {
      const response = await createBooking(obj);
      if (response.status === 201) {
        navigate("/");
        alert("Booking Successfully Done!!! Please visit Order History");
      }
    } catch (error) {
      console.log(error.message);
    }
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
          <div className="mx-5 mb-2">Seat: {seat.seatNo}</div>
          <Form.Group className="d-flex justify-content-start align-items-center flex-wrap mx-5">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              className="m-3"
              style={{ width: 250 }}
              type="text"
              maxLength={25}
              onChange={(e) =>
                handleInputChange(seat.seatId, "name", e.target.value)
              }
            ></Form.Control>
            <Form.Label>Age:</Form.Label>
            <Form.Control
              className="m-3"
              style={{ width: 80 }}
              type="number"
              maxLength={2}
              onChange={(e) =>
                handleInputChange(seat.seatId, "age", e.target.value)
              }
            ></Form.Control>
            <Form.Label>Gender:</Form.Label>
            <Button
              variant={
                selectedSeats[index] === seat &&
                passengersList[seat.seatId].gender === "Male"
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => handleInputChange(seat.seatId, "gender", "Male")}
              className="m-1"
            >
              Male
            </Button>
            <Button
              variant={
                selectedSeats[index] === seat &&
                passengersList[seat.seatId].gender === "Female"
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => handleInputChange(seat.seatId, "gender", "Female")}
              className="m-1"
            >
              Female
            </Button>
          </Form.Group>
        </div>
      ))}
      <Button onClick={() => handleBooking()}>Book Now</Button>
    </div>
  );
}

export default BookingForm;
