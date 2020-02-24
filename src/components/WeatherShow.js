import React from 'react'

function WeatherShow(props) {
    
    function loadIconWeather(idIcon){
        return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png"
     }
 
     function getUnitsSymbol(){
         if(props.unit === null){
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
            <h1>Météo : {props.weather.name}</h1> 
            <img alt="" src={loadIconWeather(props.weather.weather[0].icon)}></img>
            <p>{props.weather.weather[0].description}</p>
            <p>{props.weather.main.temp} {getUnitsSymbol()}</p>
            <p>{props.weather.main.humidity} %</p>
            <p>{props.weather.wind.speed} m/s</p>
            <p>{props.weather.main.feels_like} {getUnitsSymbol()}</p>
        </div>
    )
}

export default WeatherShow
