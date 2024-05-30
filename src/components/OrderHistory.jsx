import React, { useState, useEffect } from "react";
import { getPassengerListByCustomer } from "../service/busService";
import Loader from "./Loader";

function OrderHistory() {
  const customerId = parseInt(sessionStorage.getItem("userId"));
  const [history, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    orderList();
  }, []);

  const orderList = async () => {
    setLoading(true);
    try {
      const response = await getPassengerListByCustomer(customerId);
      setHistory(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h2 className="text-center">Order History</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Seat No</th>
                <th>Bus Name</th>
                <th>Bus Type</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.seat.seatNo}</td>
                  <td>{item.bus.name}</td>
                  <td>{item.bus.busType}</td>
                  <td>{item.bus.source}</td>
                  <td>{item.bus.destination}</td>
                  <td>
                    {item.bus.departureDate} {item.bus.departureTime}
                  </td>
                  <td>
                    {item.bus.arrivalDate} {item.bus.arrivalTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
