import React, { Component, Fragment } from "react";
import { fetchDailyWeather, fetchNowWeather } from "../api/weather";
import moment from "moment";

class Weather extends Component {
   state = {
      weatherNow: null,
      weatherDaily: null,
      error: null
   };

   componentDidMount() {
      fetchDailyWeather()
         .then(weatherDaily => {
            const weatherFiveDays = weatherDaily.filter((w, index) => {
               return index > 0 && index < 6;
            });
            this.setState({ weatherDaily: weatherFiveDays });
         })
         .catch(error => {
            this.setState({ error: error });
         });
      fetchNowWeather()
         .then(weatherNow => {
            this.setState({ weatherNow });
         })
         .catch(error => {
            this.setState({ error: error });
         });
   }

   render() {
      const { weatherNow, weatherDaily, error } = this.state;
      return (
         <div className="text-center mb-4">
            {!!error && <p>{error.message}</p>}
            {weatherNow && weatherDaily ? (
               <Fragment>
                  <h3 className="py-4"> {weatherNow.city_name} </h3>
                  <div className="row">
                     <div className="col-6 col-sm-4 offset-sm-2">
                        <img
                           src={`https://www.weatherbit.io/static/img/icons/${
                              weatherNow.weather.icon
                           }.png`}
                           alt="weather-icon-now"
                           className=" pull-right"
                        />
                     </div>
                     <div className="col-6 col-sm-4 text-left pl-0 ml-0 my-auto">
                        <h2>{`${weatherNow.temp} \u2103`} </h2>
                        <p>{weatherNow.weather.description}</p>
                     </div>
                  </div>

                  <div className="row">
                     {weatherDaily.map((weather, index) => {
                        return (
                           <ul key={index} id="weather-ul" className="col text-center">
                              <li>{moment(weather.datetime).format("ddd")}</li>
                              <li>
                                 <img
                                    src={`https://www.weatherbit.io/static/img/icons/${
                                       weather.weather.icon
                                    }.png`}
                                    alt="weather-icon-daily"
                                    style={{ width: "40px" }}
                                 />
                              </li>
                              <li>{`${weather.max_temp}\u2103`}</li>
                              <li className="text-muted">{`${weather.min_temp}\u2103`}</li>
                           </ul>
                        );
                     })}
                  </div>
               </Fragment>
            ) : (
               <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            )}
         </div>
      );
   }
}

export default Weather;
