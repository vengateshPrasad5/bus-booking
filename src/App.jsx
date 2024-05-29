import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchBus from "./components/SearchBus";
import { useState } from "react";
import { locations } from "./utils";
import BusLayout from "./components/BusLayout";
import BookingForm from "./components/BookingForm";
import { isUserLoggedIn } from "./service/authService";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<SearchBus search={search} setSearch={setSearch} />}
          />
          <Route
            path="/bus/:id"
            element={
              // <AuthenticatedRoute>
              //   </AuthenticatedRoute>
              <BusLayout
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            }
          />
          <Route
            path="/bus/addPassenger"
            element={
              <AuthenticatedRoute>
                <BookingForm selectedSeats={selectedSeats} search={search} />
              </AuthenticatedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
