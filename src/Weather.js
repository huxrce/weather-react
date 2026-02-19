import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.temperature.current,
      description: response.data.condition.description,
      humidity: response.temperature.humidity,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let key = "etab4ae54eba8ab35o7f9e68e3e0f304";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        required
        className="search-form-input"
        onChange={updateCity}
      />
      <input type="submit" value="Search" className="search-form-button" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Weather container">
        {form}
        <main>
          <div className="current-weather-data">
            <div>
              <h1 className="current-weather-city"></h1>
              <p className="current-weather-details">
                <span>Wednesday 17:37</span>,<span> {weather.description}</span>
                <br />
                Humidity: <strong>{weather.humidity}</strong>, Wind:
                <strong>{weather.wind}</strong>
              </p>
            </div>
            <div className="current-temp-details">
              <div>
                <img src={weather.icon} alt={weather.description} />
              </div>
              <div className="current-temp">{weather.temperature}</div>
              <div className="current-temp-unit">°C</div>
            </div>
          </div>
        </main>
        <footer>
          This project was coded by{" "}
          <a href="https://github.com/huxrce" target="_blank" rel="noreferrer">
            Erica Hu
          </a>
          , it's open-sourced on{" "}
          <a href="#" target="_blank" rel="noreferrer">
            GitHub
          </a>
          , and hosted on{" "}
          <a href="#" target="blank" rel="noreferrer">
            Render
          </a>
        </footer>
      </div>
    );
  } else {
    return form;
  }
}
