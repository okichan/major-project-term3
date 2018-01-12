import React from "react"

function CustomerTraffic({ traffics }) {
  return (
    <div>
      <h1 className="text-center trafficHeading">Customer Traffic</h1>
      <table className="table table-hover table-sm text-center">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Count</th>
            <th scope="col">Occupation</th>
            <th scope="col">Weather</th>
            <th scope="col">Options</th>
          </tr>
        </thead>

        <tbody>
          {traffics.map(traffic => (
            <tr className="text-center">
              <th scope="row">{traffic.date}</th>
              <td>{traffic.time}</td>
              <td>{traffic.count} people</td>
              <td>{traffic.isChef}</td>
              <td>{traffic.weather}</td>
              <td>
                <a href="#">
                  <i
                    className="fa fa-pencil-square-o med"
                    id="edit"
                    title="Edit"
                  />
                </a>
                <span className="mr-2"> </span>
                <i
                  className="fa fa-trash med"
                  id="trash"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    alert("delete function here")
                  }}
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btnContainer">
        <button
          type="button"
          className="trafficBtn btn btn-default btn-lg btn-block info"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default CustomerTraffic
