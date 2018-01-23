import React, { Component, Fragment } from "react";
import { fetchWeather } from "../api/weather";

class Weather extends Component {
  state = {
    weather: null,
    error: null
  };

  componentDidMount() {
    fetchWeather()
      .then(weather => {
        this.setState({ weather });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  render() {
    const { weather, error } = this.state;
    return (
      <div className="row m-1 text-center">
        <div className="col-md-6 mx-auto ">
          {!!error && <p>{error.message}</p>}

          {!!weather ? (
            <Fragment>
              <h3> {weather.city_name} </h3>
              <div className="row">
                <div className="col">
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.weather.icon
                    }.png`}
                    alt="icon"
                  />
                </div>
                <div className="col text-center">
                  <h2>{`${weather.temp} \u2103`} </h2>
                  <p>{weather.weather.description}</p>
                </div>
              </div>
            </Fragment>
          ) : (
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          )}
        </div>
      </div>
    );
  }
}

export default Weather;
