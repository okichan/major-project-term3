import React from "react";
import chef from "../chef.png";

const customerOriginPicks = {
	Facebook: "SNS (Facebook, Twitter etc)",
	OnlineSearch: "Online",
	Referral: "Family / Friend / Colleague",
	Newspaper: "Newspaper Article",
	WalkIn: "Walk In",
	HotelGuest: "QT Hotel Guest",
	Unknown: "Other / Unknown"
};

function CustomerForm({ customers, submitTitle, onSubmit }) {
	return (
		<div className="row ">
			<h1 className="col-12 text-center p-3">New Customer</h1>

			{customers && (
				<form
					className="col-md-7 mx-auto mb-5"
					onSubmit={event => {
						// Prevent old-school form submission
						event.preventDefault();

						const form = event.target;
						const elements = form.elements; // Allows looking up fields using their 'name' attributes
						// Get entered values from fields
						const gender = elements.gender.value;
						const firstName = elements.firstName.value;
						const lastName = elements.lastName.value;
						const email = elements.email.value;
						const phone = elements.phone.value;
						const origin = elements.origin.value;
						const isChef = elements.isChef.checked;
						const note = elements.note.value;

						// Pass this information along to the parent component
						// console.log();

						onSubmit({ gender, firstName, lastName, email, phone, origin, isChef, note });
					}}
				>
					<div className="form-group radio" id="radio">
						<span className="mr-5">Gender</span>
						<div className="form-check form-check-inline">
							<label className="form-check-label">
								<input
									required
									className="form-check-input"
									value="male"
									type="radio"
									name="gender"
								/>
								<i className="fa fa-male mr-3 med text-primary" />
							</label>
						</div>
						<div className="form-check form-check-inline">
							<label className="form-check-label">
								<input
									className="form-check-input"
									value="female"
									type="radio"
									name="gender"
								/>
								<i className="fa fa-female mr-3 med text-danger" />
							</label>
						</div>
					</div>

					<div className="form-group">
						<label>First Name</label>
						<input
							className="form-control"
							type="text"
							placeholder="Tomomi"
							name="firstName"
						/>
					</div>

					<div className="form-group">
						<label>Last Name</label>
						<input
							className="form-control"
							type="text"
							placeholder="Oki"
							name="lastName"
						/>
					</div>

					<div className="form-group">
						<label>Email</label>
						<input
							className="form-control"
							type="email"
							placeholder="test@gmail.com"
							name="email"
						/>
					</div>

					<div className="form-group">
						<label>Phone</label>
						<input
							className="form-control"
							type="text"
							placeholder="0412345678"
							name="phone"
						/>
					</div>

					<div className="form-group">
						<label>Customer Origin</label>

						{Object.keys(customerOriginPicks).map((key, index) => {
							return (
								<div className="form-check m-2" key={index}>
									<label className="form-check-label" key={key}>
										<input
                              required
											type="radio"
											className="form-check-input"
											value={key}
											name="origin"
											key={index}
										/>
										{customerOriginPicks[key]}
									</label>
								</div>
							);
						})}
					</div>

					<div className="form-group">
						<div className="form-check form-check-inline">
							<img src={chef} style={{ width: "25px" }} alt="logo" />
							<input className="form-check-input ml-2" type="checkbox" name="isChef" />
						</div>
					</div>

					<div className="form-group">
						<label>Notes</label>
						<textarea className="form-control" name="note" rows="3" />
					</div>

					<button className="btn btn-primary btn-lg float-right">{submitTitle}</button>
					<a
						href="/customers"
						className="btn btn-light btn-lg mr-2 float-right"
						role="button"
					>
						Cancel
					</a>
				</form>
			)}
		</div>
	);
}

export default CustomerForm;
