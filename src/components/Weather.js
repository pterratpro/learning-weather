import React, { useState, useEffect } from 'react'
import { getWeather, getWeatherByCity, getWeatherByCoords } from '../actions/weatherAction';
// import { mockWeather } from '../mocks/mockWeather';

function Weather() {

    // const [weather, setWeather] = useState(mockWeather);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);

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
        const weatherAjaxByCity = await getWeatherByCity(city);
        setWeather(weatherAjaxByCity.data);
    }

    function handleChange(event){
        setCity(event.target.value);
    }

    //Weather par défaut
    async function loadWeatherData(pos){
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        const weatherAjaxByCoords = await getWeatherByCoords(pos.coords);
        setWeather(weatherAjaxByCoords.data);
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

