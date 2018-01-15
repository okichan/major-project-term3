import React, { Fragment } from "react";
import { deleteCustomer } from "../api/customers";

function CustomerList({
	customers,
	editedCustomerID,
	onEditCustomer,
	renderEditForm,
	deleteCustomer
}) {
	return (
		<Fragment>
			<h2 className="text-center mb-4">Customers</h2>
			{customers && (
				<section className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Phone</th>
								<th scope="col">Note</th>
								<th scope="col" />
							</tr>
						</thead>

						{customers.map(customer => {
							const dateFormatter = date =>
								new Date(date).toLocaleDateString("ja-JP", {
									timeZone: "Australia/Melbourne"
								});
							return (
								<Fragment key={customer._id}>
									<tbody>
										<tr
											className="row-hover"
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<td>
												{customer.firstName ? customer.firstName : "(unknown)"}{" "}
												{customer.lastName ? customer.lastName : ""}
											</td>

											<td>{customer.phone ? customer.phone : "(unknown)"}</td>

											<td className="w-50">{customer.note}</td>

											<td>
												<a href={`/products/${customer._id}`}>
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
																<p>{customer.gender}</p>
																<p>
																	Email:
																	{customer.email
																		? customer.email
																		: " (unknown)"}
																</p>
															</div>
															<div className="col-md-6 ">
																<p>Customer Origin: {customer.origin}</p>
																<p>Chef: {customer.isChef ? "Yes" : "No"}</p>
															</div>
														</div>
														<hr />
														<div className="row">
															<h5 className="col-12">Purchase History:</h5>
														</div>
														<div id="purchase-history">
															<div className="d-flex flex-column-reverse">
																{customer.purchasedHistory.map((m, index) => {
																	return (
																		<p
																			className="p-1 m-0"
																			key={Math.random()}
																		>
																			{dateFormatter(m.date)} -- ${
																				m.totalPrice
																			}
																			<br />
																			{m.products.map(m => {
																				return <p>{m._id}</p>;
																			})}
																		</p>
																	);
																})}
															</div>
														</div>
													</div>
												</div>
											</td>
										</tr>
										{/* collapse end */}
									</tbody>
								</Fragment>
							);
						})}
					</table>
				</section>
			)}
		</Fragment>
	);
}

export default CustomerList;
