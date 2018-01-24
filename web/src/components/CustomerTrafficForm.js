import React from "react";

const originObject = {
  Referral: "Family / Friend / Colleague",
  OnlineSearch: "Online",
  Facebook: "SNS (Facebook, Twitter etc)",
  WalkIn: "Walk In",
  HotelGuest: "QT Hotel Guest",
  Return: "Newspaper Article",
  Unknown: "Other / Unknown",
  Return: "Return",
  Traveler: "Traveller"
};

function CustomerTrafficForm({ onChange }) {
  return (
    <div className="row">
      <div className="mx-auto m-1">
        <h1 className="text-center">Customer Traffic</h1>
        <div className="trafficForm">
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              const number = e.target.CustomerNumber.value;
              const isChef = e.target.chefSelect.value;
              const origin = e.target.originSelect.value;
              const duration = e.target.duration.value;
              const note = e.target.note.value;

              onChange({ number, origin, isChef, duration, note });
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
            <div className="form-check pl-0">
              <label htmlFor="chefSelect">Is chef?</label>
              <select className="form-control" id="chefSelect">
                <option value={"Unknown"}>I don't know</option>
                <option value={"Chef"}>Yes</option>
                <option value={"Not Chef"}>No</option>
              </select>
            </div>
            <div className="form-check pl-0">
              <label htmlFor="originSelect">Customers origin</label>
              <select className="form-control" id="originSelect">
                {Object.keys(originObject).map(originkey => {
                  return (
                    <option value={originkey} key={originkey}>
                      {originObject[originkey]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="duration">Duration (minutes)</label>
              <input
                class="form-control"
                type="number"
                id="duration"
                placeholder="Number"
              />
            </div>
            <div class="form-group">
              <label for="note">Notes</label>
              <textarea class="form-control" id="note" rows="4" />
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
