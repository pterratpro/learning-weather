import React from 'react'

function ForecastShow(props) {

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
            <img alt="" src={loadIconWeather(props.forecast.weather[0].icon)}></img>
            <p>{props.forecast.weather[0].description}</p>
            <p>{props.forecast.main.temp} {getUnitsSymbol()}</p>
        </div>
    )
}

export default ForecastShow
