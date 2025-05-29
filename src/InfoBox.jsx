import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SunnyIcon from '@mui/icons-material/Sunny';
export default function InfoBox({info}){
    const INIT_IMG = "https://images.unsplash.com/photo-1680352267694-a7fd4c33d4e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const HOT_URL = "https://media.istockphoto.com/id/1323823418/photo/low-angle-view-thermometer-on-blue-sky-with-sun-shining.jpg?s=2048x2048&w=is&k=20&c=vs-wMhpIBhtgOfVrwVCGOIqto--JCLnYkunCXaq0F7c=";
    const COLD_URL = "https://media.istockphoto.com/id/1197295830/photo/winter-morning-at-kolkata-maidan-shrouded-in-a-thick-dense-fog.jpg?s=2048x2048&w=is&k=20&c=7VTTbVM_UWnl7izNpugW6NWfTH7Ldj-m8zuiQspk13E=";
    const RAIN_URL = "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=2048x2048&w=is&k=20&c=oCeUC-IkL0PeNBE1KwDUHBWw692n3T4T6I-usYtX_Qc=";
    return(
        <div className="InfoBox">
            <div className="ContainerBox">
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80?RAIN_URL: info.temp > 15? HOT_URL :  COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}{info.humidity>80? <ThunderstormIcon/>: info.temp > 15? <SunnyIcon/> :  <AcUnitIcon/>}
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
        </div>
    );

}