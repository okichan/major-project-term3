import React from "react"

function CustomerTraffic({ traffics }) {
  return (
    <table className="table table-hover table-sm">
      <thread className="customerTable">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Count</th>
          <th scope="col">Occupation</th>
          <th scope="col">Weather</th>
        </tr>
      </thread>

      <tbody>
        {traffics.map(traffic => (
          <tr>
            <th scope="row">{traffic.date}</th>
            <td>{traffic.time}</td>
            <td>{traffic.count} people</td>
            <td>{traffic.isChef}</td>
            <td>{traffic.weather}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CustomerTraffic
