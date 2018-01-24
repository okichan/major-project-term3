import React, { Fragment } from "react";
import noImage from "../noImage.png";
import Dropzone from "react-dropzone";

function ProductList({
	filteredProducts,
	onEditedProductSubmit,
	deleteProduct,
	chosenImage,
	onDrop,
	onImageReset
}) {
	return (
		<Fragment>
			{filteredProducts && (
				<section className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Code</th>
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
											data-toggle="collapse"
											data-target={`#${product._id}`}
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											{product.code}

											{/* modal edit begin */}
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
																	const _id = elements._id.value;
																	const category = elements.category.value;
																	const code = elements.code.value;
																	const title = elements.title.value;
																	const price = elements.price.value;
																	const stock = elements.stock.value;
																	const image = chosenImage;

																	onEditedProductSubmit({
																		_id,
																		code,
																		category,
																		title,
																		price,
																		stock,
																		image
																	});
																}}
															>
																<div className="form-group">
																	<input
																		type="hidden"
																		className="form-control w-25"
																		id="_id"
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
																<Dropzone
																	onDrop={onDrop}
																	multiple={false}
																	accept="image/*"
																	// style={dropzoneStyle}
																	className="form-control w-50 pointer pt-3 "
																>
																	{chosenImage ? (
																		<div>
																			<img
																				src={chosenImage}
																				height="125"
																				width="100%"
																				style={{ opacity: "0.6" }}
																				alt="product"
																			/>
																		</div>
																	) : (
																		<p className="text-muted text-center">
																			{product.image ? (
																				<img
																					src={product.image}
																					height="125"
																					width="100%"
																					style={{ opacity: "0.6" }}
																					alt="product"
																				/>
																			) : (
																				"Drop your file or click here to upload"
																			)}
																		</p>
																	)}
																</Dropzone>
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
											{/* end modal edit / */}
											{/* begin delete modal/ */}
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
															<h5 className="modal-title" id="exampleModalLabel">
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
																}}
																data-dismiss="modal"
															>
																Delete
															</button>
														</div>
													</div>
												</div>
											</div>
											{/* end delete modal/ */}
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
												onClick={() => {
													//reset chosenImage
													onImageReset();
												}}
											/>

											{/* Delete button should only show if total sales is 0 */}
											{product.totalSales === 0 ? (
												<i
													className="fa fa-trash med mx-1"
													id="trash"
													data-toggle="modal"
													data-target={`#modaldelete-${product.code}`}
													style={{ cursor: "pointer" }}
													title="Delete"
												/>
											) : (
												""
											)}
										</td>
									</tr>
									{/* collapse begin */}
									<tr>
										<td colSpan="10" className="p-0 ">
											<div className="collapse" id={product._id}>
												<div className="card card-body m-3">
													<div className="row">
														<div className="col-3">
															<p>Total sales: {product.totalSales}</p>
															{/* <p>Total Orders: {product.totalOrders}</p> */}
														</div>
														<div className="col text-center">
															{product.image ? (
																<img
																	src={product.image}
																	style={{ width: "100%" }}
																	alt="product"
																/>
															) : (
																<img
																	src={noImage}
																	width={200}
																	height={150}
																	className="mx-auto"
																	alt="no-product"
																/>
															)}
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

export default ProductList;
