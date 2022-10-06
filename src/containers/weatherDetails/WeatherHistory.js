import React from "react";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Header } from "../../components/Header";
import { useLocation } from "react-router-dom";
export const WeatherHistory = () => {
  const location = useLocation();
  const data = location.state.item;
  return (
    <div>
      <Header>
        <Button
          to={".."}
          component={Link}
          className="primary-btn w-32"
          variant="outlined"
        >
          Go Back
        </Button>
      </Header>
      <div className="container mx-auto">
        {!_.isEmpty(data) && (
          <div className="sm:w-1/2 xs:w-full sm:h-4/6 mt-20">
            <Card className="h-4/6">
              <CardContent className="">
                <div className=" bg-white ">
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
      </div>
    </div>
  );
};
