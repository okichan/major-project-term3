import React from "react";
import { Link } from "react-router-dom";
import Incrementer from "./Incrementer";
import "../css/Slider.css"

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
		<div className="row ">
			<div className="mx-auto w-75 m-1">
				<h2 className="text-center">Customer Traffic</h2>
				<small className="float-right ">
					<Link to="/customer-traffic">view all</Link>
				</small>
				<div className="trafficForm mt-4">
					<form
						className="form"
						onSubmit={e => {
							e.preventDefault();
							const number = e.target.customerNumber.value;
							const isChef = e.target.chefSelect.value;
							const origin = e.target.originSelect.value;
							const duration = e.target.duration.value;
							const note = e.target.note.value;
							onChange({ number, origin, isChef, duration, note });
						}}
					>
						<Incrementer label="People" elementId="customerNumber" />
						<div className="form-group">
							<label>Chef?</label>
							{/* <select className="form-control" id="chefSelect"> */}
							<div className="form-check">
								<label className="form-check-label pointer">
									<input
                           required
										type="radio"
										name="chefSelect"
										className="form-check-input"
										value={"true"}
									/>
									Yes
								</label>
							</div>
							<div className="form-check">
								<label className="form-check-label pointer">
									<input
										type="radio"
										name="chefSelect"
										className="form-check-input"
										value={"false"}
									/>
									No
								</label>
							</div>
							<div className="form-check">
								<label className="form-check-label pointer">
									<input
										type="radio"
										name="chefSelect"
										className=""
										value={"Unknown"}
										className="form-check-input"
									/>
									I don't know
								</label>
							</div>
							{/* </select> */}
						</div>
						<div className="form-group">
							<label htmlFor="originSelect">Customer origin</label>
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
							<label htmlFor="duration">Duration</label>
							<input
								type="range"
                        min="0"
                        step="5"
								max="120"
								defaultValue="0"
								className="slider w-100 "
								id="duration"
								onChange={e => {
									document.getElementById("range-value").innerHTML = `${e.target.value} minutes`;
								}}
							/> 
							<p id="range-value">&#160;</p>
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