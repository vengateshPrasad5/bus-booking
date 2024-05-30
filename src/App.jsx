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
import { useAuth, AuthProvider } from "./components/AuthProvider";
import OrderHistory from "./components/OrderHistory";
import UserProfile from "./components/UserProfile";
function App() {
  const [search, setSearch] = useState({
    from: locations[0],
    to: locations[1],
    date: "",
  });
  const [selectedBus, setSelectedBus] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const userLogged = isUserLoggedIn();

  function AuthenticatedRoute({ children }) {
    const isAuth = useAuth();
    console.log(isAuth);
    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }

  return (
    <AuthProvider>
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
              userLogged && (
                <BusLayout
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  selectedBus={selectedBus}
                  setSelectedBus={setSelectedBus}
                />
              )
            }
          />
          <Route
            path="/bus/addPassenger"
            element={
              <AuthenticatedRoute>
                <BookingForm
                  selectedSeats={selectedSeats}
                  search={search}
                  selectedBus={selectedBus}
                />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/bus/bookingHistory"
            element={
              <AuthenticatedRoute>
                <OrderHistory />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <AuthenticatedRoute>
                <UserProfile />
              </AuthenticatedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
