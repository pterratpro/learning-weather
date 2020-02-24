import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FaWind, FaTemperatureHigh } from 'react-icons/fa';
import { IoIosWater } from 'react-icons/io';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
      backgroundSize:"auto"
    },
  });

function WeatherShow(props) {

    const classes = useStyles();

    function loadIconWeather(idIcon){
        return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png"
     }
 
     function getUnitsSymbol(){
         if(props.unit === "default"){
             return "K"
         } else if(props.unit==='imperial'){
             return "°F";
         }
         else{
             return "C°";
         }
     }

    return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={loadIconWeather(props.weather.weather[0].icon)}
            title="Météo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.weather.weather[0].description}
            </Typography>
            <Box textAlign="left">
                <Typography variant="h6" color="textSecondary" component="p">
                    <FaTemperatureHigh/>  {props.weather.main.temp} {getUnitsSymbol()}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    <IoIosWater/>  {props.weather.main.humidity} %
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    <FaWind /> {props.weather.wind.speed} m/s
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    <FaTemperatureHigh/>  {props.weather.main.feels_like} {getUnitsSymbol()}
                </Typography>
            </Box>
          </CardContent>
      </Card>
    )
}

export default WeatherShow
