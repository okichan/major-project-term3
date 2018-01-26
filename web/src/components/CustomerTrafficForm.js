import React from "react";
import { Link } from "react-router-dom";

const originObject = {
  Facebook: "SNS (Facebook, Twitter etc)",
  OnlineSearch: "Online Search",
  Referral: "Referral",
  Newspaper: "Newspaper Article",
  WalkIn: "Walk In",
  HotelGuest: "QT Hotel Guest",
  Return: "Return",
  Unknown: "Other / Unknown"
};

function CustomerTrafficForm({ onChange }) {
  return (
    <div className="row">
      <div className="mx-auto m-1">
        <h2 className="text-center">Customer Traffic</h2>
        <small className="float-right ">
          <Link to="/customer-traffic">view all</Link>
        </small>
        <div className="trafficForm mt-4">
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
            <div className="form-group">
              <label htmlFor="chefSelect">Is chef?</label>
              <select className="form-control" id="chefSelect">
                <option value={"Unknown"}>I don't know</option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                className="form-control  col-md-4"
                type="number"
                id="duration"
                placeholder="15"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="note">Notes</label>
              <textarea className="form-control" id="note" rows="4" />
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
