import React, { Component, Fragment } from "react";
import { fetchCurrency } from "../api/currency";

class CurrencyConverter extends Component {
	state = {
		enteredNumber: 1,
		currency: null,
		error: null
	};

	componentDidMount() {
		fetchCurrency()
			.then(currency => {
				this.setState({ currency: currency });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	render() {
		const { enteredNumber, currency, error } = this.state;
		return (
			<div className="row m-1">
				<div className="col-md-6 mx-auto ">
					{!!error && <p>{error.message}</p>}
					{!!currency ? (
						<Fragment>
							<h3>Currency</h3>
                     <div className="form-inline">
									<input
										className="form-control w-25 mr-1"
										value={enteredNumber}
										aria-label="entered number"
										onChange={e => {
											this.setState({
												enteredNumber: e.target.value
											});
										}}
                              />
								<span>
									AUD = {(currency.JPY * enteredNumber).toFixed(2)} JPY
								</span>
                              </div>
						</Fragment>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		);
	}
}

export default CurrencyConverter;
