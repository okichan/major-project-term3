import React, { Component, Fragment } from "react";
import { fetchWeather } from "../api/weather";
import moment from "moment";

fetchWeather().then(res => {
  console.log("Loaded Movie", res);
});

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
      <div>
        <div>
          {!!error && <p>{error.message}</p>}
          {!!weather ? (
            <Fragment>
              <h3 className="text-center"> {weather.city_name} </h3>
              <div className="row-fuid text-center">
                <div className="col-md-6 mx-auto">
                  <p>
                    {moment(weather.data[0].datetime.slice(0, -3)).format(
                      "dddd, MMMM do, gggg"
                    )}
                  </p>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[0].weather.icon
                    }.png`}
                    alt="icon"
                  />
                  <h2>{`${weather.data[0].temp} \u2103`} </h2>
                  <p>{weather.data[0].weather.description}</p>
                </div>
              </div>

              {/* <div className="d-flex flex-nowrap"> */}
              <div className="row text-center weekWeather">
                <div className="col-2" style={{ margin: "auto" }}>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[8].weather.icon
                    }.png`}
                    alt="icon"
                    style={{ width: "40px" }}
                  />
                  <p>
                    {moment(weather.data[8].datetime.slice(0, -3)).format(
                      "ddd"
                    )}
                  </p>
                  <strong>{`${weather.data[8].temp} \u2103`}</strong>
                  <br />
                  {weather.data[8].weather.description}
                </div>
                <div className="col-2" style={{ margin: "auto" }}>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[16].weather.icon
                    }.png`}
                    alt="icon"
                    style={{ width: "40px" }}
                  />
                  <p>
                    {moment(weather.data[16].datetime.slice(0, -3)).format(
                      "ddd"
                    )}
                  </p>
                  <strong>{`${weather.data[16].temp} \u2103`}</strong>
                  <br />
                  {weather.data[16].weather.description}
                </div>
                <div className="col-2" style={{ margin: "auto" }}>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[24].weather.icon
                    }.png`}
                    alt="icon"
                    style={{ width: "40px" }}
                  />
                  <p>
                    {moment(weather.data[24].datetime.slice(0, -3)).format(
                      "ddd"
                    )}
                  </p>
                  <strong>{`${weather.data[24].temp} \u2103`}</strong>
                  <br />
                  {weather.data[24].weather.description}
                </div>
                <div className="col-2" style={{ margin: "auto" }}>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[32].weather.icon
                    }.png`}
                    alt="icon"
                    style={{ width: "40px" }}
                  />
                  <p>
                    {moment(weather.data[32].datetime.slice(0, -3)).format(
                      "ddd"
                    )}
                  </p>
                  <strong>{`${weather.data[32].temp} \u2103`}</strong>
                  <br />
                  {weather.data[32].weather.description}
                </div>
                <div className="col-2" style={{ margin: "auto" }}>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weather.data[39].weather.icon
                    }.png`}
                    alt="icon"
                    style={{ width: "40px" }}
                  />
                  <p>
                    {moment(weather.data[39].datetime.slice(0, -3)).format(
                      "ddd"
                    )}
                  </p>
                  <strong>{`${weather.data[39].temp} \u2103`}</strong>
                  <br />
                  {weather.data[39].weather.description}
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
