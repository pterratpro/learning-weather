import axios from 'axios';

// Requete GET sur http://api.openweathermap.org/data/2.5/weather?q=London&appid=e14154b4f09fc841a46c2fd919707747
//Axios pour faire ma requete

const baseUrl = "http://api.openweathermap.org/data/2.5";
const appId= "&appid=e14154b4f09fc841a46c2fd919707747";

export function getForecast(){
    return axios.get(baseUrl+"/forecast?q=London"+appId);
}

export function getForecastByCity(city,lang,units=null){
    const parametersUnit = units ? "&units="+units : "";
    return axios.get(baseUrl+"/forecast?q="+city+"&lang="+lang+parametersUnit+appId);
}

//Requete ajax get current weather by longitude et latitude
export function getForecastByCoords(coords,lang,units=null){
    const parametersUnit = units ? "&units="+units : "";
    return axios.get(baseUrl+"/forecast?lat="+coords.latitude+"&lon="+coords.longitude+"&lang="+lang+parametersUnit+appId);
}