import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { getBusById, getBookingListByDate } from "../service/busService";
import Loader from "./Loader";

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
function BusLayout({
  selectedSeats,
  setSelectedSeats,
  selectedBus,
  setSelectedBus,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [layout, setLayout] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isSleeper = selectedBus?.busType === "Sleeper";
  const seatWidth = isSleeper ? "80px" : "25px";
  const isBookedSeat = (seat) => bookedSeats?.includes(seat);
  const isSeatSelected = (seat) => selectedSeats.includes(seat);

  useEffect(() => {
    getSelectedBus();
  }, []);
  const getSelectedBus = async () => {
    setLoading(true);
    try {
      const response = await getBusById(id);
      console.log(response.data);
      setSelectedBus(response.data);
      processSeats(response.data.seats);
      getBookingList(response.data.departureDate);
    } catch (error) {
      console.error(error);
    }
  };
  const getBookingList = async (date) => {
    try {
      const response = await getBookingListByDate(date);
      console.log(response.data);
      setLoading(false);
      setBookedSeats(getSeatIds(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  function getSeatIds(bookings) {
    const seatIds = [];
    for (const booking of bookings) {
      for (const passenger of booking.passengerList) {
        if (passenger.seatId !== null) {
          seatIds.push(passenger.seatId);
        }
      }
    }
    return seatIds;
  }

  const processSeats = (seats) => {
    const seatLayout = {
      lower: {
        first: [[], []],
        second: [],
      },
      upper: {
        first: [[], []],
        second: [],
      },
    };
    seats.forEach((seat) => {
      const { height, busRow } = seat;
      if (height === 1) {
        if (busRow === 21 || busRow === 22) {
          if (seatLayout.upper.first[0].length < 6) {
            seatLayout.upper.first[0].push(seat);
          } else {
            seatLayout.upper.first[1].push(seat);
          }
        } else if (busRow === 23) {
          seatLayout.upper.second.push(seat);
        }
      } else if (height === 0) {
        if (busRow === 11 || busRow === 12) {
          if (seatLayout.lower.first[0].length < 6) {
            seatLayout.lower.first[0].push(seat);
          } else {
            seatLayout.lower.first[1].push(seat);
          }
        } else if (busRow === 13) {
          seatLayout.lower.second.push(seat);
        }
      }
    });
    console.log(seatLayout);
    return setLayout(seatLayout);
  };

  const selectSeats = (seat) => {
    if (
      selectedSeats.some((selectedSeat) => selectedSeat.seatId === seat.seatId)
    ) {
      const seats = selectedSeats.filter(
        (selectedSeat) => selectedSeat.seatId !== seat.seatId
      );
      setSelectedSeats(seats);
      return;
    }
    setSelectedSeats((prevState) => [...prevState, seat]);
  };

  const generateSeats = (arrSeat) => {
    return arrSeat?.map((seats, index) =>
      Array.isArray(seats) ? (
        <div key={seats} className="d-flex">
          {seats.map((seat, index) => (
            <TicketItem
              key={index}
              style={{
                height: 25,
                width: seatWidth,
                background: isSeatSelected(seat)
                  ? "#318beb"
                  : isBookedSeat(seat.seatId)
                  ? "#b4b4b4"
                  : "#fff",
                cursor: isBookedSeat(seat.seatId) ? "no-drop" : "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                selectSeats(seat);
              }}
            >
              {seat.seatNo}
            </TicketItem>
          ))}
        </div>
      ) : (
        <TicketItem
          key={index}
          style={{
            height: 25,
            width: seatWidth,
            background: isSeatSelected(seats)
              ? "#318beb"
              : isBookedSeat(seats.seatId)
              ? "#b4b4b4"
              : "#fff",
            cursor: isBookedSeat(seats.seatId) ? "no-drop" : "pointer",
          }}
          onClick={() => selectSeats(seats)}
        >
          {seats.seatNo}
        </TicketItem>
      )
    );
  };

  return (
    <div className="container bg-body-secondary row border rounded shadow my-3 mx-auto p-3">
      {isLoading && <Loader />}
      <h2>{selectedBus?.name}</h2>
      <h6>{selectedBus?.busType}</h6>
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
        <ul>
          {isSleeper ? (
            <div>
              <div className="d-flex align-items-center mb-3">
                <h6 className="p-3">Upper</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(layout?.upper?.first)}
                  <div className="d-flex mt-4">
                    {generateSeats(layout?.upper?.second)}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center ">
                <h6 className="p-3">Lower</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(layout?.lower?.first)}
                  <div className="d-flex mt-4">
                    {generateSeats(layout?.lower?.second)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center mb-3">
              <h6 className="p-3">Seater</h6>
              <div className="d-flex flex-wrap">
                {generateSeats(layout?.first)}
                <div className="d-flex flex-wrap mt-4">
                  {generateSeats(layout?.second)}
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
      {selectedSeats.length > 0 && (
        <h5 className="d-flex justify-content-center">
          Selected Seats :{" "}
          {selectedSeats.map((seat) => {
            return seat.seatNo + ",";
          })}
        </h5>
      )}
      <Button
        className="mx-auto"
        style={{ width: 300 }}
        variant="success"
        disabled={!selectedSeats.length > 0}
        onClick={() => navigate("/checkout")}
      >
        Continue
      </Button>
    </div>
  );
}

export default BusLayout;
