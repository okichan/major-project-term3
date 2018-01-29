import axios from "axios";

const api_daily = axios.create({
  baseURL: `https://api.weatherbit.io/v2.0/forecast/daily?city=melbourne,australia&key=${
    process.env.REACT_APP_WEATHER_API_KEY
  }`
});

const api_now = axios.create({
  baseURL: `https://api.weatherbit.io/v2.0/current?city=melbourne,australia&key=${
    process.env.REACT_APP_WEATHER_API_KEY
  }`
});

export function fetchDailyWeather() {
  return api_daily.get().then(res => {
    return res.data.data;
  });
}

export function fetchNowWeather() {
  return api_now.get().then(res => {
    return res.data.data[0];
  });
}
