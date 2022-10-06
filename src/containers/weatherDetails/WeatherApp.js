import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";

import { getWeatherDetails, showMsg } from "./store/weatherDetailsSlice.js";
import CountryList from "../country.json";
import WeatherCard from "./WeatherCard";
import { Header } from "../../components/Header";
import CurrentWeather from "./CurrentWeather.js";

export const WeatherApp = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  const { isLoading, isMessage, message } = useSelector(
    ({ weather }) => weather
  );

  const [state, setState] = useState({
    country: "",
    city: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  return (
    <div className="root">
      <Header />
      <div className="inputHeader flex justify-center">
        <CurrentWeather />
      </div>

      <div className="container mx-auto mt-10">
        <h3 className="text-2xl text-center">
          Select country / city to know the weather details !
        </h3>
        <div className="mt-10 mb-10 sm:flex sm:justify-center">
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name="country"
                value={state.country}
                label="Country"
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                {CountryList.map((item) => {
                  return (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <TextField
            name="city"
            label="City"
            variant="outlined"
            onChange={handleChange}
            value={state.city}
            style={{ marginRight: "15px", marginLeft: "15px" }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!state.city && !state.country}
            onClick={() => dispatch(getWeatherDetails(state))}
            startIcon={<AddIcon />}
          >
            Add Weather
          </Button>
        </div>
        <div className="content">
          <WeatherCard />
        </div>

        <div className="flex flex-col items-center justify-center p-12">
          {isLoading && (
            <Typography className="text-20 mb-16" color="textSecondary">
              Loading...
            </Typography>
          )}
          {isMessage && (
            <Snackbar
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              open={isMessage}
              autoHideDuration={6000}
              onClose={() => dispatch(showMsg({ flag: false, message: "" }))}
              message={message}
            />
          )}
        </div>
      </div>
    </div>
  );
};
