import axios from "axios";

const api = axios.create({
  baseURL:
    "https://api.weatherbit.io/v2.0/forecast/3hourly?city=melbourne,australia&key=ab18b802bab64baea99604cff5ab03f3"
});

export function fetchWeather() {
  return api.get().then(res => {
    return res.data;
  });
}
