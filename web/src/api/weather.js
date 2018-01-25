import axios from "axios";

const api = axios.create({
  baseURL: `https://api.weatherbit.io/v2.0/forecast/3hourly?city=melbourne,australia&key=${
    process.env.REACT_APP_WEATHER_API_KEY
  }`
});

export function fetchWeather() {
  return api.get().then(res => {
    return res.data;
  });
}
