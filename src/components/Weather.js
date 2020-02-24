import React, { useState, useEffect } from 'react'
import addDays from 'date-fns/addDays';
import fromUnixTime from 'date-fns/fromUnixTime';
import { getWeather, getWeatherByCity, getWeatherByCoords } from '../actions/weatherAction';
import { getForecast, getForecastByCity, getForecastByCoords} from '../actions/forecastActions';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import WeatherShow from './WeatherShow';
import ForecastShow from './ForecastShow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: '2px 4px',
    margin:"50px",
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  city:{
      marginBottom:50
  }
}));
function Weather() {
    const classes = useStyles();
    // const [weather, setWeather] = useState(mockWeather);
    const [weather, setWeather] = useState(null);
    const[ isLoadingWeather, setIsLoadingWeather] = useState(true);
    const [forecasts, setForecasts] = useState(null);
    const[ isLoadingForecast, setIsLoadingForecast] = useState(true);
    const [city, setCity] = useState(null);
    const [pos, setPos] = useState(null);
    const [lang, setLang] = useState("en");
    const [isCoord,setIsCoord] = useState(true);
    const [unit, setUnit] = useState("default");
    //Use Effect => Le composant est chargé
    // => Le state est modifié (géré par [])
    useEffect(()=>{
        //Récupérer les cordonnées 
        navigator.geolocation.getCurrentPosition(loadWeatherData,errorLoadWeatherData);
    }, [])

    // Weather par city avec la barre de recherche
    async function searchWeatherByCity(){
        setIsLoadingForecast(true);
        setIsLoadingWeather(true);
        const weatherAjaxByCity = await getWeatherByCity(city,lang,unit);
        const forecastAjaxByCity = await getForecastByCity(city,lang,unit);
        setIsLoadingForecast(false);
        setIsLoadingWeather(false);
        setForecastFor4Days(forecastAjaxByCity.data);

        setIsCoord(false);
        setWeather(weatherAjaxByCity.data);

    }

    function setForecastFor4Days(data){
        const forecastCurrent = [];

        for(let i = 1; i < 5; i++){
            const currentDateNumber = addDays(new Date(), i).getDate();
            const currentForecast = data.list.find(
                fore => fromUnixTime(fore.dt).getDate() === currentDateNumber
            );
            forecastCurrent.push(currentForecast);
        }

        setForecasts(forecastCurrent);
    }

    function handleChange(event){
        setCity(event.target.value);
    }

    function handleChangeLang(event){
        setLang(event.target.value);
        if(isCoord)
            loadWeatherData(pos,event.target.value,unit);
    }

    function handleChangeUnit(event){
        setUnit(event.target.value);
        if(isCoord)
            loadWeatherData(pos,lang,event.target.value);
    }

    //Weather par défaut
    async function loadWeatherData(position,lang="en",unit="default"){
        setIsLoadingForecast(true);
        setIsLoadingWeather(true);
        const weatherAjaxByCoords = await getWeatherByCoords(position.coords,lang,unit);
        const forecastAjaxByCoords = await getForecastByCoords(position.coords,lang,unit);
        setIsLoadingForecast(false);
        setIsLoadingWeather(false);
        setWeather(weatherAjaxByCoords.data);
        setForecastFor4Days(forecastAjaxByCoords.data);
        setPos(position);
    }

    async function errorLoadWeatherData(error){
        const weatherAjax = await getWeather();
        const forecastAjax = await getForecast();
        setWeather(weatherAjax.data);
        setForecasts(forecastAjax.data);
    }

    return (
        <div>
            <Grid container justify="flex-end">
                <Grid item>            
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Langue</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    onChange={handleChangeLang}
                    >
                        <MenuItem value={"en"}>Anglais</MenuItem>
                        <MenuItem value={"fr"}>Français</MenuItem>
                        <MenuItem value={"ja"}>Japonais</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Units</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={unit}
                        onChange={handleChangeUnit}
                        >
                            <MenuItem value={"default"}>Kelvin</MenuItem>
                            <MenuItem value={"imperial"}>Farheneit</MenuItem>
                            <MenuItem value={"metric"}>Degré Celsius</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justify='center' spacing={2}>
                <Grid item>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search weather of city"
                            inputProps={{ 'aria-label': 'Search weather of city"' }}
                            onChange={handleChange} 
                        />
                        <IconButton type="button" onClick={searchWeatherByCity} className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>

            { !isLoadingWeather && weather ?    
            <Grid container justify="center" >
                <Grid item xs={12} >
                    <Typography variant="h3" component="h3" className={classes.city} >{weather.name}</Typography>
                </Grid>
                <Grid item xs={3} justify="center">
                    <WeatherShow unit={unit} weather={weather} />
                </Grid>
            </Grid>
             : <div>
             <Loader
                type="Plane"
                color="#000000"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
               </div>
            }
            { !isLoadingForecast && forecasts ?    
                <div>
                    <h1>Prévisions</h1>
                    <Grid container spacing={3}>
                    {forecasts.map((forecast, index) => {
                        return <Grid item xs={3}>
                            <ForecastShow unit={unit} date={fromUnixTime(forecast.dt)} forecast={forecast} />
                        </Grid>
                    })}
                    </Grid>
                </div>
                 : <div>
                 <Loader
                    type="Plane"
                    color="#c62828"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
                   </div>
                }



        </div>
    )
}

export default Weather

