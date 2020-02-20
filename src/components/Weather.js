import React, { useState, useEffect } from 'react'
import { getWeather, getWeatherByCity, getWeatherByCoords } from '../actions/weatherAction';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

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
    const [city, setCity] = useState(null);
    const [pos, setPos] = useState(null);
    const [lang, setLang] = useState("en");
    const [isCoord,setIsCoord] = useState(true);
    //Use Effect => Le composant est chargé
    // => Le state est modifié (géré par [])
    useEffect(()=>{
        //Récupérer les cordonnées 
        navigator.geolocation.getCurrentPosition(loadWeatherData,errorLoadWeatherData);
    }, [])

    function kelvinToCelsius(tempKelvin){
        return Math.round(tempKelvin - 273.15);
    }

    // Weather par city avec la barre de recherche
    async function searchWeatherByCity(){
        const weatherAjaxByCity = await getWeatherByCity(city,lang);
        setIsCoord(false);
        setWeather(weatherAjaxByCity.data);
    }

    function handleChange(event){
        setCity(event.target.value);
    }

    function handleChangeLang(event){
        setLang(event.target.value);
        if(isCoord)
            loadWeatherData(pos,event.target.value);
    }

    //Weather par défaut
    async function loadWeatherData(position,lang="en"){
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const weatherAjaxByCoords = await getWeatherByCoords(position.coords,lang);
        setWeather(weatherAjaxByCoords.data);
        setPos(position);
    }

    async function errorLoadWeatherData(error){
        const weatherAjax = await getWeather();
        setWeather(weatherAjax.data);
    }

    function loadIconWeather(idIcon){
       return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png"
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
            <Button ></Button>
            { weather ? 
            <div>
                <input type="text" onChange={handleChange} />
                <input type="button" onClick={searchWeatherByCity} value="Rechercher" />
                <h1>Météo : {weather.name}</h1> 
                <img alt="" src={loadIconWeather(weather.weather[0].icon)}></img>
                <p>{weather.weather[0].description}</p>
                <p>{kelvinToCelsius(weather.main.temp)} C°</p>
                <p>{weather.main.humidity} %</p>
                <p>{weather.wind.speed} m/s</p>
                <p>{kelvinToCelsius(weather.main.feels_like)} C°</p>
            </div>
             : <div>
                 <h1>Météo en attente de chargement</h1>
               </div>
            }

        </div>
    )
}

export default Weather

