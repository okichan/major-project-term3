import React from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
const dropzoneStyle = {
  width: "60%",
  height: "20%",
  border: "1px solid black",
  position: "relative"
};

function ProductForm({ products, submitTitle, onSubmit, chosenImage, onDrop }) {
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
            const image = chosenImage;

            // Pass this information along to the parent component
            onSubmit({ category, code, title, price, stock, image });
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
          <label htmlFor="image">Image</label>
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
                />
              </div>
            ) : (
              <p className="text-muted text-center">Drop your file or click here to upload</p>
            )}
          </Dropzone>

          <button className="btn btn-primary btn-lg float-right  my-3">
            {submitTitle}
          </button>
          <button
            className="btn btn-light btn-lg mr-2 float-right  my-3"
            onClick={() => {
               window.history.back();
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
