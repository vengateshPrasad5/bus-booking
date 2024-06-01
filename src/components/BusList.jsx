import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../service/authService";

function BusList({ filteredBus }) {
  const navigate = useNavigate();
  const isAuth = isUserLoggedIn();

  const calulateTimeDiff = (arrTime, depTime) => {
    const parseTime = (time) => {
      const [timePart, period] = time.split(" ");
      let [hours, minutes] = timePart.split(":");
      hours = parseInt(hours);
      minutes = parseInt(minutes);
      if (period === "PM" && hours !== 12) hours += 12;
      return new Date(2024, 0, 1, hours, minutes);
    };

    const departure = parseTime(depTime);
    const arrival = parseTime(arrTime);
    let diff = arrival - departure;
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours and ${minutes} minutes`;
  };

  return (
    <>
      {filteredBus.map((data, index) => (
        <div
          key={index}
          className="container row border rounded shadow my-3 mx-auto p-3"
        >
          <h3 className="mb-3">{data.name}</h3>
          <p className="fw-normal">{data.busType}</p>
          <div className="d-flex justify-content-evenly align-items-center">
            <div>
              <p className="fw-bold">{data.departureDate}</p>
              <p className="fw-bold m-0"> {data.source}</p>
              <p className="fw-bold">{data.departureTime.slice(0, 5)}</p>
            </div>
            <div>
              ----------
              {calulateTimeDiff(data.arrivalTime, data.departureTime)}
              ----------
            </div>
            <div>
              <p className="fw-bold">{data.arrivalDate}</p>
              <p className="fw-bold m-0"> {data.destination}</p>
              <p className="fw-bold"> {data.arrivalTime.slice(0, 5)}</p>
            </div>
            <div>
              <h5 className="text-center">
                Price: <span className="fw-bold">{data.price}</span>
              </h5>
              <Button
                variant="primary"
                className="mb-2"
                onClick={() =>
                  isAuth
                    ? navigate(`bus/${data.busId}`)
                    : alert("Please SignIn to continue")
                }
                style={{ width: 150 }}
              >
                View Seats
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default BusList;
