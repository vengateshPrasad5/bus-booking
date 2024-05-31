import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import BusList from "./BusList";
import {
  getSourceList,
  getDepartureList,
  getSearchBus,
  getBuses,
} from "../service/busService";

function SearchBus({ search, setSearch }) {
  const [filteredBus, setFilteredBus] = useState(null);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

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
  useEffect(() => {
    sourceList();
    destinationList();
    busList();
  }, []);

  const sourceList = async () => {
    try {
      const response = await getSourceList();
      setSource(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const destinationList = async () => {
    try {
      const response = await getDepartureList();
      setDestination(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const busList = async () => {
    try {
      const response = await getBuses();
      setFilteredBus(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getSearchBus(search);
      setFilteredBus(response.data);
    } catch (err) {
      console.error(err);
    }
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
              {source.map((data, index) => (
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
              {destination.map((data, index) => (
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
