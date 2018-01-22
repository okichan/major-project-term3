import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

function SaleList({
	sales,
	deleteSale,
	editSale,
	multiplyNumbers,
	capitalizeWord,
	sortByDate,
	customers
}) {
	return (
		<div className="col ">
			<h2 className="text-center mb-4">Sales</h2>
			{sales &&
				customers && (
					<section className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Date</th>
									<th scope="col">Weather</th>
									<th scope="col">Total</th>
									<th scope="col">Location</th>
									<th scope="col">Operator</th>
									<th scope="col">Customer</th>
									<th scope="col">Options</th>
								</tr>
							</thead>

							{sortByDate(sales, "date").map(sale => {
								return (
									<Fragment key={sale._id}>
										<tbody>
											<tr className="row-hover">
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
                                       {moment(sale.date).format('YYYY-MM-DD')}
												</td>
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
													{sale.weather.description}
												</td>
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
													$ {sale.totalPrice}
												</td>
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
													{capitalizeWord(sale.type)}
												</td>
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
													{sale.inCharge.userName}
												</td>
												<td
													data-toggle="collapse"
													data-target={`#${sale._id}`}
													role="button"
													aria-expanded="false"
													aria-controls="collapseExample"
												>
													{sale.customer
														? sale.customer.firstName
														: "Customer unknown"}{" "}
													{sale.customer ? sale.customer.lastName : ""}
													<br />
													<small>{sale.customer ? sale.customer.phone : ""}</small>
												</td>
												<td>
													<i
														className="fa fa-pencil-square-o med mx-1"
														id="edit"
														style={{ cursor: "pointer" }}
														title="Edit"
														//   data-toggle="modal"
														//   data-target={`#modaledit-${sale._id}`}
													/>
													<i
														className="fa fa-trash med mx-1"
														id="trash"
														style={{ cursor: "pointer" }}
														title="Delete"
														data-toggle="modal"
														data-target={`#modaldelete-${sale._id}`}
													/>
													{/* Begin modal */}
													{/* Begin Delete modal */}
													<div
														className="modal fade"
														id={`modaldelete-${sale._id}`}
														tabIndex="-1"
														role="dialog"
														aria-labelledby="exampleModalLabel"
														aria-hidden="true"
													>
														<div className="modal-dialog" role="document">
															<div className="modal-content">
																<div className="modal-header">
																	<h5 className="modal-title" id="exampleModal">
																		{sale._id}
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
																	Are you sure you would like to delete this sale?
																</div>
																<div className="modal-footer">
																	<button
																		type="button"
																		className="btn btn-secondary"
																		data-dismiss="modal"
																	>
																		Cancel
																	</button>
																	<button
																		type="button"
																		className="btn btn-danger"
																		onClick={() => {
																			deleteSale(sale._id);
																		}}
																		data-dismiss="modal"
																	>
																		Delete
																	</button>
																</div>
															</div>
														</div>
													</div>
													{/* End Delete modal */}
													{/* End modal */}
												</td>
											</tr>

											{/* <tr className="test">
												<td className="test w-100">
													<form
														onSubmit={event => {
															event.preventDefault();
															const form = event.target;
															const elements = form.elements;

															const _id = elements._id.value; // sale _id
															const customer = elements.customer.value; // customer._id
															const totalPrice = elements.totalPrice.value;
															const date = elements.date.value;
															const products = [];
															sale.products.map((m, index) => {
																let product = {
																	id: m.product._id,
                                                   salePrice: m.salePrice,
                                                   unitAmount: m.unitAmount
																};
																products.push(product);
															});

															const type = elements.type.value; // store or online

															console.log({
																_id,
																customer,
																totalPrice,
																date,
																products,
																type
															});
															editSale({ _id, customer, totalPrice, date,  type });
														}}
													>
														sale._id:{" "}
														<input
															type="text"
															name="_id"
															disabled
															defaultValue={sale._id}
														/>{" "}
														<br />
														date:{" "} */}
											{/* <DatePicker
															dateFormat="YYYY-MM-DD"
															selected={moment(sale.date)}
															onChange={() => console.log(this.value)}
															className="form-control"
															name="date"
															id="sale-edit-date"
														/> */}
											{/* <input type="date" defaultValue={moment(sale.date).format('YYYY-MM-DD')}
                                          name="date"/>
														<br />
														location: store:{" "}
														<input
															type="radio"
															value="store"
															name="type"
															defaultChecked={sale.type === "store" ? true : false}
														/>
														online:{" "}
														<input
															type="radio"
															value="online"
															name="type"
															defaultChecked={sale.type === "online" ? true : false}
														/>
														<br />
														customer
														<select defaultValue={sale.customer._id} name="customer">
															{customers.map(customer => {
																return (
																	<option value={customer._id} key={customer._id}>
																		{customer._id} - {customer.firstName}
																	</option>
																);
															})}
														</select>
														{sale.products.map(s => {
															return (
																<div
																	className="py-2 test2 my-3"
																	key={s._id}
																	style={{ whiteSpace: "nowrap" }}
																>
																	<input
																		type="text"
																		defaultValue={s.product._id}
																	/>
																	<span>({s.product.title})</span>
																	<br />
																	<span>
																		salePrice:{" "}
																		<input
																			type="number"
																			defaultValue={s.salePrice}
																			className="myClass"
																			id="myID"
																		/>{" "}
																	</span>
																	<br />
																	<span>
																		unitAmount:{" "}
																		<input
																			type="number"
																			defaultValue={s.unitAmount}
																		/>{" "}
																	</span>
																	<br />
																</div>
															);
														})}
														<br />
														total price:
														<input
															name="totalPrice"
															defaultValue={sale.totalPrice}
															key={sale.totalPrice}
														/>
														<br />
														<button>Save changes</button>
													</form>
												</td>
											</tr> */}

											{/* Collapse sale begin */}
											<tr>
												<td colSpan="10" className="p-0">
													<div className="collapse" id={sale._id}>
														<div className="card card-body m-3">
															<table className="table">
																<thead>
																	<tr className="table-light">
																		<th scope="col">Product Code</th>
																		<th scope="col">Product</th>
																		<th scope="col">Price</th>
																		<th scope="col">Quantity</th>
																		<th scope="col">Total</th>
																		<th />
																	</tr>
																</thead>
																<tbody>
																	{sale.products.map(s => {
																		return (
																			<tr key={s._id}>
																				<th scope="row">
																					{s.product
																						? s.product.code
																						: "deleted"}
																				</th>
																				<td>
																					{s.product
																						? s.product.title
																						: "deleted"}
																				</td>
																				<td>
																					{s.product
																						? s.product.price
																						: "deleted"}
																				</td>
																				<td>
																					{s.product
																						? s.unitAmount
																						: "deleted"}
																				</td>
																				<td>
																					{multiplyNumbers(
																						s.product ? s.product.price : 0,
																						s.unitAmount
																					)}
																				</td>
																			</tr>
																		);
																	})}
																</tbody>
															</table>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</Fragment>
								);
							})}
						</table>
					</section>
				)}
		</div>
	);
}

export default SaleList;
