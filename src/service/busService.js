import axios from "axios";
import { getToken, isTokenExpired, logout } from "./authService";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/";

const BASE_REST_API_URL_NO_TOKEN = "http://localhost:8080/api/v1/";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      if (isTokenExpired(token)) {
        logout();
        alert("Token Expired");
        window.location.href = "/";
        return Promise.reject(new Error("Token expired"));
      } else {
        config.headers["Authorization"] = getToken();
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getSearchBus = (obj) =>
  axios.get(
    `${BASE_REST_API_URL_NO_TOKEN}bus/searchBus?source=${obj.from}&destination=${obj.to}&departureDate=${obj.date}`
  );

export const getSourceList = () =>
  axios.get(`${BASE_REST_API_URL_NO_TOKEN}bus/getSourceList`);

export const getDepartureList = () =>
  axios.get(`${BASE_REST_API_URL_NO_TOKEN}bus/getDepartureList`);

export const getBuses = () =>
  axios.get(`${BASE_REST_API_URL_NO_TOKEN}bus/getBusList`);

export const getBusById = (id) =>
  axios.get(`${BASE_REST_API_URL_NO_TOKEN}bus/getBusById/${id}`);

export const getPassengerList = (customerId) =>
  axios.get(
    `${BASE_REST_API_URL}passenger/getPassengerList?customerId=${customerId}`
  );

export const getPassengerListByCustomer = (customerId) =>
  axios.get(
    `${BASE_REST_API_URL}passenger/getBookingListByCustomer?userId=${customerId}`
  );

export const getBookingListByDate = (reservationDate) =>
  axios.get(
    `${BASE_REST_API_URL}booking/getBookingListByDate?reservationDate=${reservationDate}`
  );

export const createBooking = (bookingObj) =>
  axios.post(`${BASE_REST_API_URL}booking/createBooking`, bookingObj);

export const createPayment = (paymentObj) =>
  axios.post(`${BASE_REST_API_URL_NO_TOKEN}payment/createPayment`, paymentObj);

export const storeInfo = (search, selectedBus, selectedSeats) => {
  sessionStorage.setItem("search", search);
  sessionStorage.setItem("selectedBus", selectedBus);
  sessionStorage.setItem("selectedSeats", selectedSeats);
};
