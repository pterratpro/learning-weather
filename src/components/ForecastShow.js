import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoIosWater } from 'react-icons/io';
import format from 'date-fns/format';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
      backgroundSize:"auto"
    },
    date:{
        margin:20
    }
  });

function ForecastShow(props) {
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
        <div>           
            <Typography className={classes.date} variant="h5" component="h2">{format(props.date,'dd/MM/Y')}</Typography>
            <Card className={classes.root}>
                <CardMedia
                className={classes.media}
                image={loadIconWeather(props.forecast.weather[0].icon)}
                title="Météo"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.forecast.weather[0].description}
                </Typography>
                <Box textAlign="left">
                    <Typography variant="h6" color="textSecondary" component="p">
                        <FaTemperatureHigh/>  {props.forecast.main.temp} {getUnitsSymbol()}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        <IoIosWater/>  {props.forecast.main.humidity} %
                    </Typography>
                </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForecastShow
