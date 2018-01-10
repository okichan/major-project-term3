import React from 'react'

function Weather({ temperature, date, forecast, icon }) {
  return (
    <div className="weatherForcast">
      <h1 className="text-center">Melbourne, Australia</h1>
      <div className="forecastContainer">
        <div className="forecast">
          <p>{forecast}</p>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${icon.slice(
              0,
              -1
            ) + 'n'}.png`}
          />
        </div>
        <div className="forecastTemp">
          <p>{temperature} ℃</p>
        </div>
      </div>
    </div>
  )
}

export default Weather
