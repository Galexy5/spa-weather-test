import React, { useState } from "react";
import { Cities } from "./Cities";
import styled from "@emotion/styled";
import Search from "./Search";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { weatherTodayService } from "../services/weather";

const PageContainer = styled.div`
  margin-top: 50px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 400px;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForecastItem = styled.span`
  display: flex;
`;

export default function Home() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [todayForecasts, setTodayForecasts] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const isToday = (dt) => {
    const forecastDate = new Date(dt * 1000); //Multiplied by 1000 because value is representing the number of millieconds since 1 Jan 1970
    const todayDate = new Date();
    return (
      todayDate.getDate() === forecastDate.getDate() &&
      todayDate.getMonth() === forecastDate.getMonth() &&
      todayDate.getFullYear() === forecastDate.getFullYear()
    );
  };

  const getForecastHour = (date) => {
    return date.split(" ")[1].slice(0, 5);
  };

  const openDialog = (city) => {
    const { lat, lon } = city;
    setSelectedCity(city);
    weatherTodayService(lat, lon).then(({ data }) => {
      setTodayForecasts(data.list.filter((forecast) => isToday(forecast.dt)));
      setOpen(true);
    });
  };

  return (
    <PageContainer>
      <h2>Weather in your city</h2>
      <Search setCities={setCities} setErrorMessage={setErrorMessage} />
      {errorMessage && <span>{errorMessage}</span>}
      <Cities cities={cities} openDialog={openDialog} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle id="dialog-title" onClose={handleClose}>
            {selectedCity.name && `Forecast in ${selectedCity.name} today`}
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogContent>
          <>
            {todayForecasts.length > 0 &&
              todayForecasts.map(({ dt, dt_txt, main, weather }) => (
                <React.Fragment key={dt}>
                  <ListItem alignItems="flex-start" style={{ width: "400px" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Weather icon"
                        src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={getForecastHour(dt_txt)}
                      secondary={
                        <React.Fragment>
                          <ForecastItem>
                            <strong>Description: </strong>
                            <span>{weather[0].description}</span>
                          </ForecastItem>
                          <ForecastItem>
                            <strong>Temperature: </strong>
                            <span>{main.temp}</span>
                          </ForecastItem>
                          <ForecastItem>
                            <strong>Min Temperature: </strong>
                            <span>{main.temp_min}</span>
                          </ForecastItem>
                          <ForecastItem>
                            <strong>Max Temperature: </strong>
                            <span>{main.temp_max}</span>
                          </ForecastItem>
                          <ForecastItem>
                            <strong>Feels like: </strong>
                            <span>{main.feels_like}</span>
                          </ForecastItem>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" />
                </React.Fragment>
              ))}
          </>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
