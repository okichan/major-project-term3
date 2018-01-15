import React from "react";
import { Link } from "react-router-dom";

function ProductForm({ products, submitTitle, onSubmit }) {
	const clear = () => {
		document.getElementById("create-product").reset();
	};

	return (
		<div className="row ">
			<h1 className="col-12 text-center p-3">New Product</h1>
			{products && (
				<form
					id="create-product"
					className="col-md-7 mx-auto mb-5"
					onSubmit={event => {
						// Prevent old-school form submission
						event.preventDefault();

						const form = event.target;
						const elements = form.elements; // Allows looking up fields using their 'name' attributes

						// Get entered values from fields
						const category = elements.category.value;
						const code = elements.code.value;
						const title = elements.title.value;
						const price = elements.price.value;
						const stock = elements.stock.value;
						const productImage = elements.productImage.value;

						// Pass this information along to the parent component
						onSubmit({ category, code, title, price, stock, productImage });
						clear();
						window.location.href = "/products";
						return false;
					}}
				>
					<div className="form-group">
						<label htmlFor="knifeCategory">Category</label>
						<select className="form-control" name="category">
							<option>Wa-Bocho</option>
							<option>Damascus</option>
							<option>Carbon Steel</option>
							<option>Inox Steel</option>
							<option>SP Inox</option>
							<option>Saya</option>
							<option>Hayate</option>
							<option>Stone</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="code">Code</label>
						<input
							type="text"
							className="form-control"
							name="code"
							placeholder="e.g. 101012"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="knifeName">Name</label>
						<input
							type="text"
							className="form-control"
							name="title"
							placeholder="e.g. 300MM YANAGIBA HAYATE (RIGHT HAND USE)"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="price">RRP</label>
						<input
							type="number"
							className="form-control"
							name="price"
							placeholder="e.g.100"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="stock">Quantity</label>
						<input
							type="number"
							className="form-control"
							name="stock"
							placeholder="e.g. 5"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="productImage">Upload image (NOT WORKING)</label>
						<input type="file" className="form-control" name="productImage" />
					</div>

					<button className="btn btn-primary btn-lg float-right">{submitTitle}</button>
					<Link to="/products" className="btn btn-light btn-lg mr-2 float-right" role="button">
						Cancel
					</Link>
				</form>
			)}
		</div>
	);
}

export default ProductForm;
