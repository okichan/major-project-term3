import axios from 'axios'

const api = axios.create({
  baseURL: 'https://forex.1forge.com/1.0.2'
})

export function fetchCurrency(number) {
  return api
    .get(
      `convert?from=AUD&to=JPY&quantity=${number}&api_key=xOBV6KQbVgUWD4YSo5Lv07oC9MKuiFhs`
    )
    .then(res => {
      return res
    })
}
