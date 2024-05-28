import axios from "axios";
import { getToken } from "./authService";

const BASE_REST_API_URL = "http://localhost:8080/api/v1/";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getSearchBus = (obj) =>
  axios.get(
    `${BASE_REST_API_URL}/bus/searchBus?source=${obj.source}&destination=${obj.destination}&departureDate=${obj.departureDate}`
  );

export const getSourceList = () =>
  axios.get(`${BASE_REST_API_URL}/bus/getSourceList`);

export const getDepartureList = () =>
  axios.get(`${BASE_REST_API_URL}/bus/getDepartureList`);

export const getBusById = (id) =>
  axios.get(`${BASE_REST_API_URL}/bus/getBusById/${id}`);

export const getPassengerList = (customerId) =>
  axios.get(
    `${BASE_REST_API_URL}/passenger/getPassengerList?customerId=${customerId}`
  );

export const getPassengerListByCustomer = (customerId) =>
  axios.get(
    `${BASE_REST_API_URL}/passenger/getBookingListByCustomer?userId=${customerId}`
  );

export const getBookingListByDate = (reservationDate) =>
  axios.get(
    `${BASE_REST_API_URL}/booking/getBookingListByDate?reservationDate =${reservationDate}`
  );

export const createBooking = (bookingObj) =>
  axios.post(`${BASE_REST_API_URL}/booking/createBooking`, bookingObj);
