import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import { getCurrentWeatherDetails } from "./store/weatherDetailsSlice.js";
import ForecastWeather from "./ForecastWeather.js";

function CurrentWeather() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.weather.weatherDetails);

  useEffect(() => {
    dispatch(getCurrentWeatherDetails());
  }, []);

  return (
    <div className="flex flex-col h-4/6">
      {!_.isEmpty(data) && (
        <div className="w-full h-4/6">
          <Card className="h-4/6">
            <CardContent className="relative">
              <CardMedia
                component="img"
                alt="image"
                className="h-4/6"
                image={
                  data && data.current.temp_c < 20
                    ? "assets/images/winter.jpg"
                    : data &&
                      data.current.temp_c > 20 &&
                      data.current.temp_c < 30
                    ? "assets/images/autumn.jpg"
                    : "assets/images/summer.jpg"
                }
              />
              <div
                className="sm:absolute p-10 sm:right-0 bg-white sm:w-1/2 xs:w-full"
                
                style={{ top: "5%" }}
              >
                <Typography
                  className="text-left font-400"
                  style={{ fontSize: "22px" }}
                >
                  Weather Today in{" "}
                  <b>
                    {data && data.location.name},{" "}
                    {data && data.location.country}{" "}
                  </b>
                </Typography>
                <h2 className="text-left text-4xl font-400 mt-2">
                  <b>{data && data.current.temp_c}°</b>
                </h2>
                <Typography className="text-left text-16 font-400 mt-2">
                  {data && data.current.condition.text}
                </Typography>
                <div
                  className="flex text-left text-13 font-600 mt-4 justify-between leading-loose"
                  color="textSecondary"
                >
                  <div className="flex flex-col">
                    <p>
                      <OpacityIcon className="mr-3" />
                      Humidity: {data && data.current.humidity}
                    </p>
                    <p>
                      <CompressIcon className="mr-3" />
                      Pressure: {data && data.current.pressure_in}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <AirIcon className="mr-3" />
                      Wind: {data && data.current.wind_kph}
                    </p>
                    <p>
                      <VisibilityIcon className="mr-3" />
                      Visibility: {data && data.current.uv}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="w-full h-full ">
        <div className="sm:absolute sm:p-5 sm:top-0 bg-white sm:w-1/4 xs:w-full sm:ml-10  sm:mt-24">
          {!_.isEmpty(data) && (
            <ForecastWeather data={data && data.forecast.forecastday} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
