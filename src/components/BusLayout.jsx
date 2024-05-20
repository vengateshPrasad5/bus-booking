import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Buses } from "../utils";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const TicketItem = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px, 2px, 4px rgba(0, 0, 0, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
function BusLayout({ selectedSeats, setSelectedSeats }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedBus = Buses.find((data) => data.id === parseInt(id));
  const isSleeper = selectedBus.busType === "Sleeper";
  const seatWidth = isSleeper ? "80px" : "25px";
  const isSeatAvailable = (seat) => selectedBus.availableSeats.includes(seat);
  const isSeatSelected = (seat) => selectedSeats.includes(seat);
  const selectSeats = (seat) => {
    if (selectedSeats?.includes(seat)) {
      const seats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(seats);
      return;
    }
    setSelectedSeats((prevState) => [...prevState, seat]);
  };
  const generateSeats = (arrSeat, key = "") => {
    return arrSeat.map((seats, index) =>
      Array.isArray(seats) ? (
        <div key={seats} className="d-flex">
          {seats.map((seat, index) => (
            <TicketItem
              key={index}
              style={{
                height: 25,
                width: seatWidth,
                background: isSeatSelected(`${key}${seat}`)
                  ? "#318beb"
                  : isSeatAvailable(`${key}${seat}`)
                  ? "#fff"
                  : "#b4b4b4",
                cursor: isSeatAvailable(`${key}${seat}`)
                  ? "pointer"
                  : "no-drop",
              }}
              onClick={() => selectSeats(`${key}${seat}`)}
            >
              {key}
              {seat}
            </TicketItem>
          ))}
        </div>
      ) : (
        <TicketItem
          key={index}
          style={{
            height: 25,
            width: seatWidth,
            background: isSeatSelected(`${key}${seats}`)
              ? "#318beb"
              : isSeatAvailable(`${key}${seats}`)
              ? "#fff"
              : "#b4b4b4",
            cursor: isSeatAvailable(`${key}${seats}`) ? "pointer" : "",
          }}
          onClick={() => selectSeats(`${key}${seats}`)}
        >
          {key}
          {seats}
        </TicketItem>
      )
    );
  };

  return (
    <div className="container bg-body-secondary row border rounded shadow my-3 mx-auto p-3">
      <h2>{selectedBus.name}</h2>
      <h6>{selectedBus.busType}</h6>
      <div className="d-flex">
        {/* ----- Seat availability */}
        <div className="d-flex mb-2 align-items-center">
          <section>Available - </section>
          <section
            className="border shadow rounded p-2 mx-2 "
            style={{ width: seatWidth, background: "#fff" }}
          >
            {}
          </section>
        </div>
        <div className="d-flex mb-2 align-items-center">
          <section>Booked - </section>
          <section
            className="border shadow rounded p-2 mx-2 "
            style={{ width: seatWidth, background: "#b4b4b4" }}
          >
            {}
          </section>
        </div>
        <div className="d-flex mb-2 align-items-center">
          <section>Selected - </section>
          <section
            className="border shadow rounded p-2 mx-2 "
            style={{ width: seatWidth, background: "#318beb" }}
          >
            {}
          </section>
        </div>
        {/* ------------------------- */}
      </div>
      {/* --------- Seat Layout ---------- */}
      <div>
        <ul className="d-flex flex-wrap">
          {isSleeper ? (
            <>
              <div className="d-flex align-items-center mb-3">
                <h6 className="p-3">Upper</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedBus.seatLayout.upper.first, "U")}
                  <div className="d-flex mt-4">
                    {generateSeats(selectedBus.seatLayout.upper.second, "U")}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center ">
                <h6 className="p-3">Lower</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedBus.seatLayout.lower.first, "L")}
                  <div className="d-flex mt-4">
                    {generateSeats(selectedBus.seatLayout.lower.second, "L")}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center mb-3">
              <h6 className="p-3">Seater</h6>
              <div className="d-flex flex-wrap">
                {generateSeats(selectedBus.seatLayout.first)}
                <div className="d-flex flex-wrap mt-4">
                  {generateSeats(selectedBus.seatLayout.second)}
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
      {selectedSeats.length > 0 && (
        <h5 className="d-flex justify-content-center">
          Selected Seats : {selectedSeats.join(", ")}
        </h5>
      )}
      <Button
        className="mx-auto"
        style={{ width: 300 }}
        variant="success"
        disabled={!selectedSeats.length > 0}
        onClick={() => navigate("/bus/addPassenger")}
      >
        Continue
      </Button>
    </div>
  );
}

export default BusLayout;
