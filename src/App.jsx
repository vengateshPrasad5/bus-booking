import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchBus from "./components/SearchBus";
import { useEffect, useState } from "react";
import { locations } from "./utils";
import BusLayout from "./components/BusLayout";
import BookingForm from "./components/BookingForm";
// import { isUserLoggedIn } from "./service/authService";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
// import { UseAuth, AuthProvider } from "./components/AuthProvider";
import OrderHistory from "./components/OrderHistory";
import UserProfile from "./components/UserProfile";
import PrivateOutlet from "./components/PrivateOutlet";
import Payment from "./components/Payment";
function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });
  const [selectedBus, setSelectedBus] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);

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
            path="/bus/addPassenger"
            element={
              <BookingForm
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                search={search}
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
