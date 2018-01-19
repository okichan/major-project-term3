import React, { Fragment } from "react";
import chef from "../chef.png";

const dateFormatter = date =>
	new Date(date).toLocaleDateString("ja-JP", {
		timeZone: "Australia/Melbourne"
	});

const customerOriginPicks = {
	Facebook: "SNS (Facebook, Twitter etc)",
	OnlineSearch: "Online",
	Referral: "Family / Friend / Colleague",
	Newspaper: "Newspaper Article",
	WalkIn: "Walk In",
	HotelGuest: "QT Hotel Guest",
	Unknown: "Other / Unknown"
};

function CustomerList({
	customers,
	products,
	// editedCustomerID,
	editCustomer,
	renderEditForm,
	deleteCustomer
}) {
	if (customers && products) {
		let productIds = [];
		customers.map(customer => {
			customer.purchasedHistory.map(sale => {
				sale.products.map(product => {
					const id = product.product;
					productIds.push(id);
				});
			});
		});
	}

	return (
		<Fragment>
			<h2 className="text-center mb-4">Customers</h2>
			{customers && (
				<section className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col" />
								<th scope="col">Phone</th>
								<th scope="col">Note</th>
								<th scope="col" />
							</tr>
						</thead>

						{customers.map((customer, index) => {
							return (
								<tbody key={index}>
									<tr className="row-hover">
										<td
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
											width="15%"
										>
											{customer.gender === "male" ? (
												<i className="fa fa-male text-primary" />
											) : (
												<i className="fa fa-female text-danger" />
											)}{" "}
											{customer.firstName ? customer.firstName : "(unknown)"}{" "}
											{customer.lastName ? customer.lastName : ""}
										</td>

										<td
											className="pr-4"
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{customer.isChef ? (
												<img src={chef} style={{ width: "25px" }} alt="logo" />
											) : (
												""
											)}
										</td>

										<td
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{customer.phone ? customer.phone : "(unknown)"}
										</td>

										<td
											className="w-50"
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{customer.note}
										</td>

										<td>
											<i
												className="fa fa-pencil-square-o med mx-1"
												id="edit"
												title="Edit"
												id="edit"
												data-toggle="modal"
												data-target={`#modal-${customer._id}`}
												title="Edit"
											/>

											{/* Delete button should only show if purchase history is 0 */}
											{customer.purchasedHistory.length === 0 ? (
												<i
													className="fa fa-trash mx-1 med"
													id="trash"
													style={{ cursor: "pointer" }}
													onClick={() => {
														const confirm = window.confirm(
															`Do you really want to delete "${
																customer.firstName
															}"?`
														);
														if (confirm) {
															deleteCustomer(customer._id);
														}
													}}
													title="Delete"
												/>
											) : (
												""
											)}
										</td>
									</tr>

									{/* collapse begin */}
									<tr>
										<td colSpan="10" className="p-0">
											<div className="collapse" id={customer._id}>
												<div className="card card-body m-3">
													<div className="row">
														<div className="col-md-6 ">
															<p>
																Registered:{" "}
																{dateFormatter(customer.registerDate)}
															</p>
															<p>customer id (TEST): {customer._id}</p>
															<p>
																Email:{" "}
																{customer.email ? customer.email : "(unknown)"}
															</p>
														</div>
														<div className="col-md-6 ">
															<p>Customer Origin: {customer.origin}</p>
														</div>
													</div>
													<hr />
													<div className="row">
														<h5 className="col-12">Purchase History:</h5>
													</div>
													<div id="purchase-history">
														<div className="d-flex flex-column-reverse">
															{customer.purchasedHistory.map(sale => {
																return (
																	<div className="m-2" key={sale._id}>
																		{dateFormatter(sale.date)}{" "}
																		<small>[sale#: {sale._id}]</small>
																		{sale.products.map(product => {
																			return (
																				<li className="" key={product._id}>
																					product: {product.product}
																				</li>
																			);
																		})}
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
									{/* collapse end */}

									{/* begin modal edit */}
									<div
										className="modal fade"
										id={`modal-${customer._id}`}
										tabIndex="-1"
										role="dialog"
										aria-labelledby="exampleModalLabel"
										aria-hidden="true"
									>
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLabel">
														Edit product
													</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close"
													>
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body">
													<form
														id={`editForm-${customer._id}`}
														onSubmit={event => {
															// Prevent old-school form submission
															event.preventDefault();

															const form = event.target;
															const elements = form.elements; // Allows looking up fields using their 'name' attributes

															// Get entered values from fields
															const _id = elements._id.value;
															const gender = elements.gender.value;
															const firstName = elements.firstName.value;
															const lastName = elements.lastName.value;
															const email = elements.email.value;
															const phone = elements.phone.value;
															const origin = elements.origin.value;
															const isChef = elements.isChef.checked;
															const note = elements.note.value;

															// console.log({
															// 	_id,
															// 	gender,
															// 	firstName,
															// 	lastName,
															// 	email,
															// 	phone,
															// 	origin,
															// 	isChef,
															// 	note
															// });
															editCustomer({
																_id,
																gender,
																firstName,
																lastName,
																email,
																phone,
																origin,
																isChef,
																note
															});
														}}
													>
														<div className="form-group">
															<input
																type="hidden"
																className="form-control "
																id="_id"
																name={customer._id}
																disabled
																defaultValue={customer._id}
															/>
														</div>
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
																		defaultChecked={
																			customer.gender === "male"
																				? true
																				: false
																		}
																	/>
																	<i className="fa fa-male mr-3 med text-primary" />
																</label>
															</div>
															<div className="form-check form-check-inline">
																<label className="form-check-label">
																	<input
																		className="form-check-input"
																		type="radio"
																		name="gender"
																		value="female"
																		defaultChecked={
																			customer.gender === "female"
																				? true
																				: false
																		}
																	/>
																	<i className="fa fa-female mr-3 med text-danger" />
																</label>
															</div>
														</div>
														<div className="form-group">
															<label>First Name</label>
															<input
																type="text"
																className="form-control"
																name="firstName"
																defaultValue={customer.firstName}
															/>
														</div>
														<div className="form-group">
															<label>Last Name</label>
															<input
																type="text"
																className="form-control"
																name="lastName"
																defaultValue={customer.lastName}
															/>
														</div>
														<div className="form-group">
															<label>Email</label>
															<input
																type="email"
																className="form-control"
																name="email"
																defaultValue={customer.email}
															/>
														</div>
														<div className="form-group">
															<label>Phone</label>
															<input
																type="text"
																className="form-control"
																name="phone"
																defaultValue={customer.phone}
															/>
														</div>
														<div className="form-group">
															<label>Customer Origin</label>

															{Object.keys(customerOriginPicks).map(
																(key, index) => {
																	return (
																		<div
																			className="form-check m-2"
																			key={index}
																		>
																			<label
																				className="form-check-label"
																				key={key}
																			>
																				<input
																					type="radio"
																					className="form-check-input"
																					value={key}
																					name="origin"
																					key={index}
																					defaultChecked={
																						customer.origin === key
																							? true
																							: false
																					}
																				/>
																				{customerOriginPicks[key]}
																			</label>
																		</div>
																	);
																}
															)}

															<div className="form-group">
																{" "}
																<div className="form-check form-check-inline">
																	<img
																		src={chef}
																		style={{ width: "25px" }}
																		alt="logo"
																	/>
																	<input
																		className="form-check-input ml-2"
																		type="checkbox"
																		name="isChef"
																		defaultChecked={
																			customer.isChef ? true : false
																		}
																	/>
																</div>
															</div>
															<div className="form-group">
																<label>Notes</label>
																<textarea
																	// type="text"
																	className="form-control"
																	name="note"
																	defaultValue={customer.note}
																/>
															</div>
														</div>
													</form>
												</div>
												<div className="modal-footer ">
													<button
														type="button"
														className="btn btn-secondary "
														data-dismiss="modal"
													>
														Cancel
													</button>

													<button
														type="submit"
														form={`editForm-${customer._id}`}
														className="btn btn-primary "
													>
														Save changes
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* end modal edit */}
									{/* begin modal delete */}
									{/* end modal delete */}
								</tbody>
							);
						})}
					</table>
				</section>
			)}
		</Fragment>
	);
}

export default CustomerList;
