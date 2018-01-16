import React, { Fragment } from "react";

function ProductList({
	filteredProducts,
	onEditedProductSubmit,
	deleteProduct
}) {
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
									<tr
										className="row-hover"
										data-toggle="collapse"
										data-target={`#${product._id}`}
										role="button"
										aria-expanded="false"
										aria-controls="collapseExample"
									>
										<td>{product.code}</td>
										<td>{product.category}</td>
										<td>{product.title}</td>
										<td>${product.price}</td>
										<td className="text-center">{product.stock}</td>
										<td>
											<i
												className="fa fa-pencil-square-o med"
												// type="button"
												id="edit"
												data-toggle="modal"
												data-target={`#modal-${product.code}`}
												title="Edit"
											/>
											<span className="mr-2"> </span>
											<i
												className="fa fa-trash med"
												id="trash"
												style={{ cursor: "pointer" }}
												onClick={() => {
													const confirm = window.confirm(
														`Do you really want to delete "${product.title}"?`
													);
													if (confirm) {
														deleteProduct(product._id);
													}
												}}
												title="Delete"
											/>
										</td>
									</tr>
									{/* collapse begin */}
									<tr>
										<td colSpan="10" className="p-0">
											<div className="collapse" id={product._id}>
												<div className="card card-body m-3">
													<div className="row">
														<div className="col-2">
															<p>Total sales: {product.totalSales}</p>
														</div>
														<div className="col-3">
															<p>Total Orders: {product.totalOrders}</p>
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
									{/* collapse end */}

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

                                             onEditedProductSubmit({ id, code, category, title, price })
															window.location.href = "/products";
															return false;
														}}
													>
														<div className="form-group">
															<label>ID</label>
															<input
																type="text"
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
													</form>
												</div>
												<div className="modal-footer">
													<button
														type="submit"
														form={`editForm-${product.code}`}
														className="btn btn-primary col-12"
													>
														Save changes
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* modal end */}
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
