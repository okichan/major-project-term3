import React from "react";
const customerOriginPicks = [
	"Family / Friend / Colleague",
	"Online",
	"SNS (Facebook, Twitter etc)",
	"Walk In",
	"QT Hotel Guest",
	"Newspaper Article",
	"Other"
];

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
						const lastName = elements.lastName.value;

						// Pass this information along to the parent component
						onSubmit({ gender, lastName });
						// alert("i'm from child", document.querySelector('input[name="gender"]:checked'));
					}}
				>
					<div className="form-group radio" id="radio">
						<span className="mr-5">Gender</span>
						<div className="form-check form-check-inline">
							<label className="form-check-label">
								<input
									className="form-check-input"
									value="male"
									type="radio"
									name="gender"
								/>
								Male
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
								Female
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
						<input className="form-control" type="text" placeholder="Oki" name="lastName" />
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
						{customerOriginPicks.map((pick, index) => {
							return (
								<div className="form-check m-2" key={index}>
									<input
										type="radio"
										className="form-check-input"
										name="origin"
										key={pick}
									/>
									<label className="form-check-label" key={index}>
										{pick}
									</label>
								</div>
							);
						})}
					</div>

					<div className="form-group">
						<label className="mr-5">Chef?</label>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="isChef" />
							<label className="form-check-label">Yes</label>
						</div>

						<div className="form-check form-check-inline">
							<input className="form-check-input" type="radio" name="ifChef" />
							<label className="form-check-label">No</label>
						</div>
					</div>

					<div className="form-group">
						<label>Notes</label>
						<textarea className="form-control" name="note" rows="3" />
					</div>

					<button className="btn btn-primary btn-lg float-right">{submitTitle}</button>
					<a href="/customers" className="btn btn-light btn-lg mr-2 float-right" role="button">
						Cancel
					</a>
				</form>
			)}
		</div>
	);
}

export default CustomerForm;
