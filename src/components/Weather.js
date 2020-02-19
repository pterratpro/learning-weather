import React, { useState, useEffect } from 'react'
import { getWeather, getWeatherByCity } from '../actions/weatherAction';
// import { mockWeather } from '../mocks/mockWeather';

function Weather() {

    // const [weather, setWeather] = useState(mockWeather);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);

    //Use Effect => Le composant est chargé
    // => Le state est modifié (géré par [])
    useEffect(()=>{
        loadWeatherData();
    }, [])

    function kelvinToCelsius(tempKelvin){
        return Math.round(tempKelvin - 273.15);
    }

    async function searchWeatherByCity(){
        const weatherAjaxByCity = await getWeatherByCity(city);
        setWeather(weatherAjaxByCity.data);
    }

    function handleChange(event){
        setCity(event.target.value);
    }

    async function loadWeatherData(){
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

