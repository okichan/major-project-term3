import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.fixer.io/latest?base=AUD'
})

export function fetchCurrency(number) {
  return api.get(``).then(res => {
    return res.data.rates
  })
}
