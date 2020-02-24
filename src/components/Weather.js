import React, { useState, useEffect } from 'react'
import { getWeather, getWeatherByCity, getWeatherByCoords } from '../actions/weatherAction';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import WeatherShow from './WeatherShow';

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
    const [unit, setUnit] = useState(null);
    //Use Effect => Le composant est chargé
    // => Le state est modifié (géré par [])
    useEffect(()=>{
        //Récupérer les cordonnées 
        navigator.geolocation.getCurrentPosition(loadWeatherData,errorLoadWeatherData);
        // loadWeatherData({coords:{lon:58, lat:127}});
    }, [])

    // Weather par city avec la barre de recherche
    async function searchWeatherByCity(){
        const weatherAjaxByCity = await getWeatherByCity(city,lang,unit);
        setIsCoord(false);
        setWeather(weatherAjaxByCity.data);
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
    async function loadWeatherData(position,lang="en",unit=null){
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const weatherAjaxByCoords = await getWeatherByCoords(position.coords,lang,unit);
        setWeather(weatherAjaxByCoords.data);
        setPos(position);
    }

    async function errorLoadWeatherData(error){
        const weatherAjax = await getWeather();
        setWeather(weatherAjax.data);
    }

    return (
        <div>

            { weather ? 
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
                        <MenuItem value={null}>Kelvin</MenuItem>
                        <MenuItem value={"imperial"}>Farheneit</MenuItem>
                        <MenuItem value={"metric"}>Degré Celsius</MenuItem>
                    </Select>
                </FormControl>
                <input type="text" onChange={handleChange} />
                <input type="button" onClick={searchWeatherByCity} value="Rechercher" />
                <WeatherShow unit={unit} weather={weather} />
            </div>
             : <div>
                 <h1>Météo en attente de chargement</h1>
               </div>
            }

        </div>
    )
}

export default Weather

