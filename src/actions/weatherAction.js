import axios from 'axios';

// Requete GET sur http://api.openweathermap.org/data/2.5/weather?q=London&appid=e14154b4f09fc841a46c2fd919707747
//Axios pour faire ma requete

export function getWeather(){
    return axios.get("http://api.openweathermap.org/data/2.5/weather?q=London&appid=e14154b4f09fc841a46c2fd919707747");
}