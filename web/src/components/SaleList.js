import React, { Fragment } from "react";

function SaleList({ sales }) {
	return (
		<div className="col ">
			<h2 className="text-center mb-4">Sales</h2>
			{sales && (
				<section className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Total</th>
								<th scope="col">At</th>
								<th scope="col">Operator</th>
								<th scope="col">
									<i className="fa fa-phone" />
								</th>
								<th scope="col" />
							</tr>
						</thead>

						{sales.map(sale => {
							const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
							const day = days[new Date(sale.date).getDay()];
							const date = `${day}, ${new Date(sale.date).toLocaleString("ja-JP", {
								timeZone: "Australia/Melbourne"
							})}`;

							return (
								<Fragment key={sale._id}>
									<tbody>
										<tr
											className="row-hover"
											data-toggle="collapse"
											data-target={`#${sale._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<td>{date}</td>

											<td>$ {"products.price?"}</td>
											<td>{sale.type}</td>
											<td>{"inCharge.firstName"}</td>
											<td>{"buyer's phone"}</td>

											<td>
												<a href={`/products/${sale._id}`}>
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
														alert("delete function here");
													}}
													title="Delete"
												/>
											</td>
										</tr>

										{/* collapse begin */}
										<tr>
											<td colSpan="10" className="p-0">
												<div className="collapse" id={sale._id}>
													<div className="card card-body m-3">
														<div className="row">
															<p className="col-12 ">Item:</p>
														</div>
														<div id="purchase-history">
															<ul>
																{/* {sale.purchasedHistory.map(m => {
                                                   <li>{m.sale._id}</li>
                                                })} */}
																<li>product array</li>
																<li>product array</li>
																<li>product array</li>
															</ul>
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
		</div>
	);
}

export default SaleList;
