import React, { Component } from 'react'
import { fetchCurrency } from '../api/forex'
import Yen from '../components/Yen'

fetchCurrency(200).then(res => {
  console.log('Loaded AUD', res)
})

class CurrencyConverter extends Component {
  state = {
    enteredNumber: 1,
    currency: null
    // error: null
  }

  componentDidMount() {
    fetchCurrency(200)
      .then(currency => {
        this.setState({ currency: currency })
      })
      .catch(error => {
        this.setState({ error: error })
        console.log('Error loading currency conversion', error)
      })
  }

  onChangeEnteredNumber = event => {
    const input = event.target
    const value = input.value
    this.setState({
      enteredNumber: value
    })
  }

  fetchJapanCurrency = () => {
    const { enteredNumber } = this.state
    fetchCurrency(enteredNumber)
      .then(currency => {
        this.setState({ currency: currency })
      })
      .catch(error => {
        // if (error.response.status === 404) {
        //   error = new Error('Thats not a number')
        // }
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
          <h1>JPY</h1>
          <input
            value={enteredNumber}
            placeholder="1"
            aria-label="entered number"
            onChange={this.onChangeEnteredNumber}
          />

          <button className="currencyConvert" onClick={this.fetchJapanCurrency}>
            Convert
          </button>

          {!!error && <p>{error.message}</p>}

          {!!currency ? (
            <Yen japaneseYen={currency.value} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    )
  }
}

export default CurrencyConverter
