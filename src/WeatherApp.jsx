import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div className="weather-app">
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            {weatherInfo ? <InfoBox info={weatherInfo} /> : <p>Enter a city to see the weather.</p>}
        </div>
    );
}

