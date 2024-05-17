import React, { useState } from "react";
import { Buses, locations } from "../utils";
import { Form, Button } from "react-bootstrap";
import BusList from "./BusList";

function SearchBus({ search, setSearch }) {
  const [filteredBus, setFilteredBus] = useState(null);
  const handleFromSearch = (e) => {
    setSearch((prevState) => ({ ...prevState, from: e.target.value }));
  };
  const handleToSearch = (e) => {
    setSearch((prevState) => ({ ...prevState, to: e.target.value }));
  };
  const handleDate = (e) => {
    setSearch((prevState) => ({ ...prevState, date: e.target.value }));
    console.log(e.target.value);
  };
  const handleSearch = () => {
    // do an API call to get the buses on the selected options
    setFilteredBus(
      Buses.filter(
        (data) =>
          data.source === search.from &&
          data.destination === search.to &&
          data.availableDates.includes(search.date)
      )
    );
  };
  return (
    <div>
      <section className="py-5 border-rounded shadow">
        <h3 className="fw-bold py-3 text-center ">Search for Buses</h3>
        <div className="d-flex justify-content-center align-items-center p-4 ">
          <div className="row">
            <h4 className="col">From </h4>
            <Form.Select
              className="mb-3 col-md-4"
              style={{ width: "250px" }}
              value={search.from}
              onChange={(e) => handleFromSearch(e)}
            >
              {locations.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </Form.Select>
            <h4 className="col">To </h4>
            <Form.Select
              className="mb-3 col-md-4"
              style={{ width: "250px" }}
              value={search.to}
              onChange={(e) => handleToSearch(e)}
            >
              {locations.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </Form.Select>
            <input
              type="date"
              style={{ width: 300, height: 38 }}
              className="form-control mx-3"
              value={search.date}
              onChange={(e) => handleDate(e)}
            />
            <Button
              variant="primary"
              style={{ height: 38 }}
              className="col"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </section>
      <section>
        {filteredBus && filteredBus.length > 0 && (
          <BusList filteredBus={filteredBus} />
        )}
        {filteredBus && filteredBus.length < 1 && (
          <article className="fs-1 my-5 fw-bold text-center">
            No Buses Found
          </article>
        )}
      </section>
    </div>
  );
}

export default SearchBus;
