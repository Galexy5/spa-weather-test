import axios from "axios";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const baseURI = "http://api.openweathermap.org/"
const errorMessage ="Do what you want with that information (https://www.youtube.com/watch?v=VtRb4qEpWRg)"

const getRequest = (url)=>{
    return axios.get(url)
    .catch((error)=>{
        console.log(`Error: ${error} \n ${errorMessage}`)
    })
}

export const geoCodingService = async (cityName,stateCode="",countryCode="",limit="") => {
    const url = `${baseURI}geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${API_KEY}`;

    return await getRequest(url);
}

export const weatherTodayService = async (lat,lon)=>{
    const url = `${baseURI}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    return await getRequest(url);
}