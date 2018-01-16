import React, { Fragment } from "react";

function ProductList({ filteredProducts, onEditedProductSubmit, deleteProduct }) {
	return (
		<Fragment>
			{filteredProducts && (
				<section className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Category</th>
								<th scope="col">Name</th>
								<th scope="col">RRP</th>
								<th scope="col">Stock</th>
								<th scope="col" />
							</tr>
						</thead>

						{filteredProducts.map(product => {
							return (
								<tbody key={product._id}>
									<tr className="row-hover">
										<td
										>
											{product.code}

											{/* modal begin */}
											<div
												className="modal fade"
												id={`modal-${product.code}`}
												tabIndex="-1"
												role="dialog"
												aria-labelledby="exampleModalLabel"
												aria-hidden="true"
											>
												<div className="modal-dialog" role="document">
													<div className="modal-content">
														<div className="modal-header">
															<h5
																className="modal-title"
																id="exampleModalLabel"
															>
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
																id={`editForm-${product.code}`}
																onSubmit={event => {
																	// Prevent old-school form submission
																	event.preventDefault();

																	const form = event.target;
																	const elements = form.elements; // Allows looking up fields using their 'name' attributes

																	// Get entered values from fields
																	const id = elements.id.value;
																	const category = elements.category.value;
																	const code = elements.code.value;
																	const title = elements.title.value;
																	const price = elements.price.value;
																	const stock = elements.stock.value;

																	onEditedProductSubmit({
																		id,
																		code,
																		category,
																		title,
																		price,
																		stock
																	});
																	window.location.href = "/products";
																	return false;
																}}
															>
																<div className="form-group">
																	<input
																		type="hidden"
																		className="form-control w-25"
																		id="id"
																		name={product._id}
																		disabled
																		defaultValue={product._id}
																	/>
																</div>
																<div className="form-group">
																	<label>Code</label>
																	<input
																		type="text"
																		className="form-control w-25"
																		id="code"
																		name={product.code}
																		defaultValue={product.code}
																	/>
																</div>
																<div className="form-group">
																	<label>Category</label>
																	<input
																		type="text"
																		className="form-control"
																		id="category"
																		name={product.category}
																		defaultValue={product.category}
																	/>
																</div>
																<div className="form-group">
																	<label>Name</label>
																	<input
																		type="text"
																		className="form-control"
																		id="title"
																		name={product.title}
																		defaultValue={product.title}
																	/>
																</div>
																<div className="form-group">
																	<label>RRP</label>
																	<input
																		type="number"
																		className="form-control w-25"
																		id="price"
																		name={product.price}
																		defaultValue={product.price}
																	/>
																</div>
																<div className="form-group">
																	<label>Stock</label>
																	<input
																		type="number"
																		className="form-control w-25"
																		id="stock"
																		name={product.stock}
																		defaultValue={product.stock}
																	/>
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
																form={`editForm-${product.code}`}
																className="btn btn-primary "
															>
																Save changes
															</button>
														</div>
													</div>
												</div>
											</div>
											{/* begin delete moda/ */}
											<div
												className="modal fade"
												id={`modaldelete-${product.code}`}
												tabIndex="-1"
												role="dialog"
												aria-labelledby="exampleModalLabel"
												aria-hidden="true"
											>
												<div className="modal-dialog" role="document">
													<div className="modal-content">
														<div className="modal-header">
															<h5
																className="modal-title"
																id="exampleModalLabel"
															>
																{`Are you sure you want to delete "${
																	product.title
																}"?`}
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
														{/* <div className="modal-body">{`Are you sure you want to delete ${product.title}?`}</div> */}
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
																className="btn btn-danger "
																onClick={() => {
																	deleteProduct(product._id);
																	window.location.href = "/products";
																	return false;
																}}
															>
																Delete
															</button>
														</div>
													</div>
												</div>
											</div>
											{/* end delete moda/ */}
											{/* modal end */}
										</td>
										<td
											data-toggle="collapse"
											data-target={`#${product._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{product.category}
										</td>
										<td
											data-toggle="collapse"
											data-target={`#${product._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{product.title}
										</td>
										<td
											data-toggle="collapse"
											data-target={`#${product._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											${product.price}
										</td>
										<td className="text-center">{product.stock}</td>
										<td>
											<i
												className="fa fa-pencil-square-o med mx-1"
												// type="button"
												id="edit"
												data-toggle="modal"
												data-target={`#modal-${product.code}`}
												title="Edit"
											/>
											<i
												className="fa fa-trash med mx-1"
												id="trash"
												data-toggle="modal"
												data-target={`#modaldelete-${product.code}`}
												style={{ cursor: "pointer" }}
												title="Delete"
											/>
										</td>
									</tr>
									{/* collapse begin */}
									<tr>
										<td colSpan="10" className="p-0 ">
											<div className="collapse" id={product._id}>
												<div className="card card-body m-3">
													<div className="row">
														<div className="col-2">
															<p>Total sales: {product.totalSales}</p>
														</div>
														<div className="col-3">
															<p>Total Orders: {product.totalOrders}</p>
														</div>
														<div className="col-3" />
													</div>

													<img
														src="https://www.qthotelsandresorts.com/melbourne/wp-content/uploads/sites/9/2017/05/Jam-on-Your-Collar-Tanto-0098.jpg"
														style={{ width: "100%" }}
													/>
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

export default ProductList;
