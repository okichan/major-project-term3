import React from "react";

const originObject = {
	Facebook: "SNS (Facebook, Twitter etc)",
	OnlineSearch: "Online",
	Referral: "Family / Friend / Colleague",
	Newspaper: "Newspaper Article",
	WalkIn: "Walk In",
	HotelGuest: "QT Hotel Guest",
	Return: "Return",
	Unknown: "Other / Unknown"
};

function CustomerTrafficForm({ onChange }) {
	return (
		<div className="px-md-5">
			<h3 className="text-center ">Customer Traffic</h3>
			{/* <div className="form-group"> */}
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
					<select multiple className="form-control " id="CustomerNumber">
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
						<option value={"unknown"}>I don't know</option>
						<option value={"true"}>Yes</option>
						<option value={"false"}>No</option>
					</select>
				</div>
				<div className="form-group mb-3">
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
					<button type="submit" className="col btn btn-primary mt-3">
						Save
					</button>
				</div>

				<div className="form-group">
				</div>
			</form>
			{/* </div> */}
		</div>
	);
}

export default CustomerTrafficForm;
