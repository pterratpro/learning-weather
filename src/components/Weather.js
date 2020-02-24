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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Weather() {
    const classes = useStyles();
    // const [weather, setWeather] = useState(mockWeather);
    const [weather, setWeather] = useState(null);
    const [forecasts, setForecasts] = useState(null);
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
        const weatherAjaxByCity = await getWeatherByCity(city,lang,unit);
        const forecastAjaxByCity = await getForecastByCity(city,lang,unit);
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
        const weatherAjaxByCoords = await getWeatherByCoords(position.coords,lang,unit);
        const forecastAjaxByCoords = await getForecastByCoords(position.coords,lang,unit);
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
            <input type="text" onChange={handleChange} />
            <input type="button" onClick={searchWeatherByCity} value="Rechercher" />
            { weather ?    
            <div>
                <WeatherShow unit={unit} weather={weather} />
            </div>
             : <div>
                 <h1>Météo en attente de chargement</h1>
               </div>
            }
            { forecasts ?    
                <div>
                    <h1>Prévisions</h1>
                    {forecasts.map((forecast, index) => {
                        return <ForecastShow unit={unit} forecast={forecast} />
                    })}
                </div>
                 : <div>
                     <h1>Prévisions en attente de chargement</h1>
                   </div>
                }



        </div>
    )
}

export default Weather

