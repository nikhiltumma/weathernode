import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import "./SearchBox"
export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "fe5e366887b1ab7acc137f38c6792813"; 
    let getWeatherInfo = async() => {
        try{
            let response =   await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let JsonResponse = await response.json();
            let result = {
              city: city,
              temp: JsonResponse.main.temp,
              tempMin: JsonResponse.main.temp_min,
              tempMax: JsonResponse.main.temp_max,
              humidity: JsonResponse.main.humidity,
              feelsLike: JsonResponse.main.feels_like,
              weather: JsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        }
        catch(err){
            throw err;
        }
    };
    let handleInput = (event)=>{
        setCity(event.target.value);
    }
    let handleSubmit = async (event) =>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }
        catch(err){
            setError(true);
        }
     
    }
    return(
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleInput} name="city"/>
            <br /><br />
            <Button variant="contained" type = "submit" >
        Search
      </Button>
       {error && <p style={{color: "red"}}>No such place exists!</p>}
            </form>
        </div>
    );
}