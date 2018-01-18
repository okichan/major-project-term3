import React, { Fragment } from "react";
import chef from "../chef.png";

function CustomerList({
	customers,
	products,
	editedCustomerID,
	onEditCustomer,
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

						{customers.map(customer => {
							const dateFormatter = date =>
								new Date(date).toLocaleDateString("ja-JP", {
									timeZone: "Australia/Melbourne"
								});
							return (
								<tbody key={Math.random()}>
									<tr className="row-hover">
										<td
											data-toggle="collapse"
											data-target={`#${customer._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{customer.gender === "male" ? (
												<i className="fa fa-male" />
											) : (
												<i className="fa fa-female" />
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
											<a href={`/products/${customer._id}`}>
												<i
													className="fa fa-pencil-square-o med mx-1"
													id="edit"
													title="Edit"
												/>
											</a>

											{/* Delete button should only show if purchase history is 0 */}
											{customer.purchasedHistory.length === 0 ? (
												<i
													className="fa fa-trash mx-1 med"
													id="trash"
													style={{ cursor: "pointer" }}
													onClick={() => {
														const confirm = window.confirm(
															`Do you really want to delete "${customer.firstName}"?`
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
															<p>Registered: {dateFormatter(customer.registerDate)}</p>
															<p>customer id (TEST): {customer._id}</p>
															<p>
																Email:
																{customer.email ? customer.email : " (unknown)"}
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
																	<div className="m-2">
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
