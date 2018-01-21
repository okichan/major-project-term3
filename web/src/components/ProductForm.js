import React from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
const dropzoneStyle = {
  width: "60%",
  height: "20%",
  border: "1px solid black",
  position: "relative"
};

const categoryArray = [
  "Wa-Bocho",
  "Damascus",
  "Carbon Steel",
  "Inox Steel",
  "SP Inox",
  "Saya",
  "Hayate",
  "Stone",
  "Sharpening"
];

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
              {categoryArray.map((categoryArr, index) => {
                return (
                  <option key={`productCate${index}`}>{categoryArr}</option>
                );
              })}
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

          {/* RRP and amount same row begin */}
          <div className="form-row">
            {/* RRP */}
            <div className="form-group col-md-4 ">
              <label htmlFor="price">RRP</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="e.g.100"
                required
              />
            </div>

            {/* amount */}
            <div className="form-group col-md-3 ">
              <label htmlFor="amount">Amount</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text pointer"
                    onClick={e => {
                      let amount = document.getElementById("amount");
                      if (/\d/.test(amount.value) && amount.value > 1) {
                        amount.value = Number(amount.value) - 1;
                      }
                    }}
                  >
                    <i className="fa fa-minus " />
                  </span>
                </div>
                <input
                  id="amount"
                  name="stock"
                  type="text"
                  className="form-control text-center"
                  defaultValue="1"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text pointer"
                    onClick={e => {
                      let amount = document.getElementById("amount");
                      if (/\d/.test(amount.value)) {
                        amount.value = Number(amount.value) + 1;
                      }
                    }}
                  >
                    <i className="fa fa-plus " />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* RRP and amount same row end */}

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
              <p className="text-muted text-center">
                Drop your file or click here to upload
              </p>
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
