// App.jsx
import React, { useState } from 'react';
import WeatherApp from './WeatherApp';
import WeatherChart from './WeatherChart';
import './App.css';

function App() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: 'Delhi',
    feelsLike: 35.52,
    humidity: 40,
    temp: 34.05,
    tempMax: 34.05,
    tempMin: 34.05,
    weather: 'haze',
  });

  return (
    <>
      <WeatherApp WeatherInfo={weatherInfo} updateInfo={setWeatherInfo} />
      <WeatherChart info={weatherInfo} />
    </>
  );
}
export default App;
