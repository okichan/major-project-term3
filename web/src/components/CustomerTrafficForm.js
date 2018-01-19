import React from "react";

const originObject = {
  Referral: "Family / Friend / Colleague",
  OnlineSearch: "Online",
  Facebook: "SNS (Facebook, Twitter etc)",
  WalkIn: "Walk In",
  HotelGuest: "QT Hotel Guest",
  Return: "Newspaper Article",
  Unknown: "Other / Unknown"
};

function CustomerTrafficForm({ onChange }) {
  return (
    <div className="row">
      <div className="col-md-6 mx-auto m-1">
        <h1 className="text-center">Customers Traffic</h1>
        <div className="trafficForm">
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              const number = e.target.CustomerNumber.value;
              const isChef = e.target.chefSelect.value;
              const origin = e.target.originSelect.value;

              onChange({ number, origin, isChef });
            }}
          >
            <div className="form-group">
              <label htmlFor="CustomerNumber">People</label>
              <select multiple className="form-control" id="CustomerNumber">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                  return (
                    <option key={`trafficId${num}`} value={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-check">
              <label for="chefSelect">Is chef?</label>
              <select className="form-control" id="chefSelect">
                <option value={"unknown"}>I don't know</option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
            </div>
            <div className="form-check mb-3">
              <label for="originSelect">Customers origin</label>
              <select className="form-control" id="originSelect">
                {Object.keys(originObject).map(originkey => {
                  return (
                    <option value={originkey}>{originObject[originkey]}</option>
                  );
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-primary pull-right">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerTrafficForm;
