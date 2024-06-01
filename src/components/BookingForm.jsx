import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking, createPayment, storeInfo } from "../service/busService";
import { getLoggedInUser } from "../service/authService";
import SmallLoader from "./SmallLoader";

function BookingForm({
  selectedSeats,
  search,
  setSearch,
  selectedBus,
  setSelectedBus,
  setSelectedSeats,
}) {
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setLoading] = useState(false);
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
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
    // handleBooking();
  }, []);
  useEffect(() => {
    if (paymentId) {
      setSearch(sessionStorage.getItem("search"));
      setSelectedBus(sessionStorage.getItem("selectedBus"));
      setSelectedSeats(sessionStorage.getItem("selectedSeats"));
    }
  }, []);
  const handleBooking = async () => {
    setLoading(true);
    const passengerList = Object.values(passengersList).map((passenger) => ({
      ...passenger,
    }));
    const bookingObj = {
      paymentId: paymentId,
      reservationDate: selectedBus.departureDate,
      status: "Confirmed",
      userId: parseInt(sessionStorage.getItem("userId")),
      busId: selectedBus.busId,
      passengerList,
    };
    try {
      // if (paymentId && paymentStatus === "paid") {
      //   console.log("Create booking");
      const bookingResponse = await createBooking(bookingObj);
      if (bookingResponse.status === 201) {
        setLoading(false);
        navigate("/");
        alert("Booking Successfully Done!!! Please visit Booking History");
        setSelectedSeats([]);
      }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreatePayment = async () => {
    setLoading(true);
    console.log(selectedBus);

    const paymentObj = {
      userName: getLoggedInUser(),
      amount: selectedBus.price * selectedSeats.length,
    };
    storeInfo(search, selectedBus, selectedSeats);
    try {
      const paymentResponse = await createPayment(paymentObj);
      window.location.href = paymentResponse.data.payment_link_url;
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
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
      <Button onClick={() => handleBooking()}>
        {isLoading && <SmallLoader />} Book Now
      </Button>
    </div>
  );
}

export default BookingForm;
