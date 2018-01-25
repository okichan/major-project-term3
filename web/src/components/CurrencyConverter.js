import React, { Component, Fragment } from "react";
import { fetchCurrency } from "../api/currency";

class CurrencyConverter extends Component {
  state = {
    enteredNumber: 1,
    currency: null,
    invert: true,
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
    const { enteredNumber, currency, invert, error } = this.state;
    return (
      <div className="row m-1 text-center">
        <div className="col-md-6 mx-auto">
          {!!error && <p>{error.message}</p>}
          {!!currency ? (
            <Fragment>
              <h3>Currency</h3>
              <div className="row form-inline text-center">
                <input
                type="number"
                  className="form-control w-25 mr-1"
                  value={enteredNumber}
                  aria-label="entered number"
                  onChange={e => {
                    this.setState({
                      enteredNumber: e.target.value
                    });
                  }}
                />
                {invert ? (
                  <span>
                    AUD{" "}
                    <i
                      className="fa fa-exchange fa-1x mx-1 text-center"
                      id="invert"
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ invert: !invert });
                      }}
                    />{" "}
                    {(currency.JPY * enteredNumber).toFixed(2)} JPY
                  </span>
                ) : (
                  <span>
                    JPY{" "}
                    <i
                      className="fa fa-exchange fa-1x mx-1 text-center"
                      id="invert"
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ invert: !invert });
                      }}
                    />{" "}
                    {(1 / currency.JPY * enteredNumber).toFixed(2)} AUS
                  </span>
                )}
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

export default CurrencyConverter;
