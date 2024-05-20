import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBus from "./components/SearchBus";
import { useState } from "react";
import { locations } from "./utils";
import BusLayout from "./components/BusLayout";
import BookingForm from "./components/BookingForm";

function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SearchBus search={search} setSearch={setSearch} />}
          />
          <Route
            path="/bus/:id"
            element={
              <BusLayout
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            }
          />
          <Route
            path="/bus/addPassenger"
            element={
              <BookingForm selectedSeats={selectedSeats} search={search} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
