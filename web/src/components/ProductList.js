import React, { Fragment } from "react";

function ProductList({
   filteredProducts,
	editedProductID,
	onEditProduct,
	renderEditForm,
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
