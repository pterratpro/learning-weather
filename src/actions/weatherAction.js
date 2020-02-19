import axios from 'axios';

// Requete GET sur http://api.openweathermap.org/data/2.5/weather?q=London&appid=e14154b4f09fc841a46c2fd919707747
//Axios pour faire ma requete

const baseUrl = "http://api.openweathermap.org/data/2.5";
const appId= "&appid=e14154b4f09fc841a46c2fd919707747";

export function getWeather(){
    return axios.get(baseUrl+"/weather?q=London"+appId);
}

export function getWeatherByCity(city){
    return axios.get(baseUrl+"/weather?q="+city+appId);
}

//Requete ajax get current weather by longitude et latitude
export function getWeatherByCoords(coords){
    return axios.get(baseUrl+"/weather?lat="+coords.latitude+"&lon="+coords.longitude+appId);
}