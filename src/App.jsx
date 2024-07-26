import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBus from "./components/SearchBus.jsx";
import { useState } from "react";
import { locations } from "./utils/index.js";
import BusLayout from "./components/BusLayout.jsx";
import BookingForm from "./components/BookingForm.jsx";
// import { isUserLoggedIn } from "./service/authService";
import LoginComponent from "./components/LoginComponent.jsx";
import RegisterComponent from "./components/RegisterComponent.jsx";
// import { UseAuth, AuthProvider } from "./components/AuthProvider";
import OrderHistory from "./components/OrderHistory.jsx";
import UserProfile from "./components/UserProfile.jsx";
import PrivateOutlet from "./components/PrivateOutlet.jsx";
import Payment from "./components/Payment.jsx";
import { getToken, isTokenExpired } from "./service/authService.js";
function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });
  const [selectedBus, setSelectedBus] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  console.log("isTokenExpired", isTokenExpired(getToken()));

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateOutlet />}>
          <Route
            path="/bus/:id"
            element={
              <BusLayout
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                selectedBus={selectedBus}
                setSelectedBus={setSelectedBus}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <BookingForm
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                search={search}
                setSearch={setSearch}
                setSelectedBus={setSelectedBus}
                selectedBus={selectedBus}
              />
            }
          />
          <Route path="/bus/bookingHistory" element={<OrderHistory />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/"
          element={<SearchBus search={search} setSearch={setSearch} />}
        />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
