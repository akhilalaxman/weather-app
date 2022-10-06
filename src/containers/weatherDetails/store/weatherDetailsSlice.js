import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import _ from "lodash";

//current weather
export const getCurrentWeatherDetails = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=Lisbon&days=7`
  );
  response && dispatch(setLoading(false));
  return response.status
    ? dispatch(setWeatherDetails(response.data))
    : dispatch(showMsg({ flag: true, message: response.message }));
};

//get weather details
export const getWeatherDetails = (state) => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      process.env.REACT_APP_API_KEY
    }&q=${state.country || state.city}`
  );
  response && dispatch(setLoading(false));
  return response.status
    ? (dispatch(getDetails(response.data)),
      dispatch(
        showMsg({
          flag: true,
          message: `Weather details of ${response.data.location.country} added!`,
        })
      ))
    : dispatch(showMsg({ flag: true, message: response.message }));
};

//set weather list
export const setList = (data) => async (dispatch, getState) => {
  const List = getState().weather.weatherList;
  return List.some((list) => list.location.name === data.location.name)
    ? dispatch(
        showMsg({
          message: "Weather of this place has already been added!",
          flag: true,
        })
      )
    : dispatch(updateList(_.isEmpty(List) ? [data] : [...List, data]));
};

//delete a record from weather list
export const deleteList = (country) => async (dispatch, getState) => {
  const List = getState().weather.weatherList;

  return (
    dispatch(
      updateList(
        _.filter(List, function (o) {
          return o.location.country !== country;
        })
      )
    ),
    dispatch(
      showMsg({
        message: `Weather of this ${country} has been deleted!`,
        flag: true,
      })
    )
  );
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    details: {},
    weatherList: [],
    weatherDetails: {},
  },
  reducers: {
    setWeatherDetails: (state, action) => {
      state.weatherDetails = action.payload;
    },
    getDetails: (state, action) => {
      state.details = action.payload;
    },
    showMsg: (state, action) => {
      state.isMessage = action.payload.flag;
      state.message = action.payload.message;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateList: (state, action) => {
      state.weatherList = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});
export const {
  getDetails,
  showMsg,
  setLoading,
  updateList,
  setHistory,
  setWeatherDetails,
} = weatherSlice.actions;

export default weatherSlice.reducer;
