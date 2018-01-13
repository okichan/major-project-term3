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
			<div className="row m-1">
				<div className="col-md-6 mx-auto ">
					{!!error && <p>{error.message}</p>}

					{!!weather ? (
						<Fragment>
							<h3> {weather.city_name} </h3>
							<p>{weather.weather.description}</p>
							<img
								src={`https://www.weatherbit.io/static/img/icons/${
									weather.weather.icon
								}.png`}
								alt="icon"
							/>
							<span>{`${weather.temp} \u2103`} </span>
						</Fragment>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		);
	}
}

export default Weather;
