import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
export default function InfoBoxs(){
    const INIT_IMG = "https://images.unsplash.com/photo-1673191898695-8252d409d82c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    let info = {
      city: "Delhi",
      feelsLike: 35.52,
      humidity: 40,
      temp: 34.05,
      tempMax: 34.05,
      tempMin: 34.05,
      weather: "haze"
          };
    return(
        <div className='InfoBox'>
            <h1>Weather Info - {info.weather}</h1>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={INIT_IMG}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
        <p>Temperature = {info.temp}&deg;C</p>
            <p>
                Humidity = {info.humidity}
            </p>
            <p>
                Min Temp = {info.tempMin}&deg;C
            </p>
            <p>
                Max Temp = {info.tempMax}&deg;C
            </p>
            <p>
                The weather can be described as like <i>{info.weather} and feels like {info.feelsLike}&deg;C</i>
            </p>  
        </Typography>
      </CardContent>
    </Card>
        </div>
    );
}