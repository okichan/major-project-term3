import React, { Fragment } from "react";

function SaleList({ sales }) {
	return (
		<div className="col ">
			<h2 className=" text-center mb-3 mt-3">Products</h2>
			{sales && (
				<table
					className="table table-sm"
					style={{ borderBottom: "1px solid silver" }}
				>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">RRP</th>
							<th scope="col">Stock</th>
							<th scope="col" />
						</tr>
					</thead>

					{sales.map(product => {
						return (
							<Fragment key={product._id}>
								<tbody>
									<tr
										className="header"
										style={{ borderBottom: "2px solid transparent" }}
									>
										<td>{product.code}</td>

										<td>
											<a
												data-toggle="collapse"
												href={`#${product.code}`}
												role="button"
												aria-expanded="false"
												aria-controls="collapseExample"
											>
												{product.title}
											</a>
										</td>
										<td>${product.price}</td>
										<td className="text-center">{product.stock}</td>
										<td>
											<a href={`/products/${product._id}`}>
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
									<tr>
										<td colSpan="5">
											<div className="collapse" id={product.code}>
												<div className="card card-body">
													<div className="row">
														<div className="col-2">
															<p>
																Total sales:{" "}
																{product.totalSales}
															</p>
														</div>
														<div className="col-3">
															<p>
																Total Orders:{" "}
																{product.totalOrders}
															</p>
														</div>
														<div className="col-3">
															<p>Cost JPY: xxx</p>
															<p>Cost AUD: xxx</p>
														</div>
													</div>

													<img
														src="https://www.qthotelsandresorts.com/melbourne/wp-content/uploads/sites/9/2017/05/Jam-on-Your-Collar-Tanto-0098.jpg"
														style={{ width: "100%" }}
													/>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</Fragment>
						);
					})}
				</table>
			)}
		</div>
	);
}

export default SaleList;
