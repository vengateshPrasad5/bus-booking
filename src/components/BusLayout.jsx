import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Buses } from "../utils";
import styled from "styled-components";

const TicketItem = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1px;
  background-color: #fff;
  border-radius: 5;
  box-shadow: 0px, 2px, 4px rgba(0, 0, 0, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
function BusLayout({ selectedSeats, setSelectedSeats }) {
  const { id } = useParams();
  const selectedBus = Buses.find((data) => data.id === parseInt(id));
  const isSleeper = selectedBus.busType === "Sleeper";
  const seatWidth = isSleeper ? "80px" : "25px";
  const isSeatAvailable = (seat) => selectedBus.availableSeats.includes(seat);
  const generateSeats = (arrSeat, key) => {
    return arrSeat.map((seats, index) =>
      Array.isArray(seats) ? (
        <div key={seats} className="d-flex">
          {seats.map((seat, index) => (
            <TicketItem
              key={index}
              style={{
                height: 18,
                width: seatWidth,
                background: isSeatAvailable(`${key}${seat}`)
                  ? "#fff"
                  : "#b4b4b4",
              }}
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
            height: 18,
            width: seatWidth,
            background: isSeatAvailable(`${key}${seats}`) ? "#fff" : "#b4b4b4",
          }}
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
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BusLayout;
