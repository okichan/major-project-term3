import React, { Component } from 'react'
import { fetchCurrency } from '../api/currency'

class CurrencyConverter extends Component {
  state = {
    enteredNumber: 1,
    currency: null
    // error: null
  }

  componentDidMount() {
    fetchCurrency()
      .then(currency => {
        this.setState({ currency: currency })
      })
      .catch(error => {
        this.setState({ error: error })
        console.log('Error loading currency conversion', error)
      })
  }

  render() {
    const { enteredNumber, currency, error } = this.state
    return (
      <div className="App">
        <div className="currencyConverter">
          <h1>Currency Converter</h1>
          <div className="country">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/1200px-Flag_of_Australia.svg.png"
              className="ausFlag"
              alt="Australian flag"
            />
            <div className="currencyAmount">
              <p>$</p>
              <input
                value={enteredNumber}
                placeholder="1"
                aria-label="entered number"
                onChange={e => {
                  this.setState({ enteredNumber: e.target.value })
                }}
              />
            </div>
          </div>

          <br />
          <div className="country">
            {!!error && <p>{error.message}</p>}

            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png"
              className="jpyFlag"
              alt="Japanese flag"
            />
            {!!currency ? (
              <div className="curdrencyAmount">
                {' '}
                <p>¥</p>
                <input
                  value={(currency.JPY * enteredNumber).toFixed(2)}
                  placeholder="1"
                  onChange={e => {
                    this.setState({ enteredNumber: e.target.value })
                  }}
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConverter
