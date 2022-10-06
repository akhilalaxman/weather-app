import React from "react";
import _ from "lodash";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LightModeIcon from "@mui/icons-material/LightMode";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Moment from "react-moment";
function ForecastWeather({ data }) {
  return (
    <div>
      <h2 className="mb-5 text-center">
        <b>DAILY FORECAST</b>
      </h2>
      {!_.isEmpty(data) &&
        data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center border-solid border-y border-gray-200  py-1">
              <div className="flex flex-col w-32 pl-4">
                <p className="capitalize">
                  <b>
                    <Moment format="ddd">{item.date}</Moment>
                  </b>
                </p>
                <p className="capitalize">
                  <b>
                    <Moment format="DD">{item.date}</Moment>
                  </b>
                </p>
              </div>
              <div className="flex flex-col items-center w-40 ">
                <p>
                  {item.day.maxtemp_c < 20 ? (
                    <AcUnitIcon />
                  ) : item.day.maxtemp_c > 20 && item.day.maxtemp_c < 30 ? (
                    <LightModeIcon />
                  ) : (
                    <WbSunnyIcon />
                  )}
                </p>

                <p className="text-xs text-center">{item.day.condition.text}</p>
              </div>
              <div className="flex flex-col items-center w-32">
                <ThermostatIcon />
                <p className="text-sm">
                  {" "}
                  {item.day.mintemp_c}°/{item.day.maxtemp_c}°
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ForecastWeather;
