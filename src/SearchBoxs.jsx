import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
export default function SearchBoxs(){
    let [city, setCity] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "fe5e366887b1ab7acc137f38c6792813";
    let getWeatherInfo  = async() =>{
        let response = await fetch(`${API_URL}?=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,

        };
        console.log(result);
    }
    let handleInput = (event) =>{
        setCity(event.target.value);
    }
    let handleSubmit = (event)=>{
        event.preventDefault();
        console.log(city);
        getWeatherInfo();
        setCity("");
    }
    return(
        <div className='SearchBox'>
            <h1>Weather Info</h1>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleInput} name="city" />
            <br /><br />
            <Button variant="contained" type="submit">Search</Button>
            </form>
        </div>
    );
}