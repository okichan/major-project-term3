import React from 'react'
import { Link } from 'react-router-dom'

function EditProductForm({ initialProduct = {}, submitTitle, onSubmit }) {
  return (
    <div className="container">
      <h1 className="text-center mb-5">Edit Product</h1>
      <form
        onSubmit={event => {
          // Prevent old-school form submission
          event.preventDefault()

          const form = event.target
          const elements = form.elements // Allows looking up fields using their 'name' attributes
          // Get entered values from fields
          const brandName = elements.brandName.value
          const name = elements.name.value

          // Pass this information along to the parent component
          onSubmit({ brandName, name })
        }}
      >
        <div class="form-group">
          <label for="knifeCategory">Category</label>
          <select className="form-control" id="knifeCategory">
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
        <div class="form-group">
          <label for="itemCode">Item Code</label>
          <input
            type="number"
            class="form-control"
            id="itemCode"
            placeholder="e.g. 101012"
          />
        </div>
        <div class="form-group">
          <label for="knifeName">Name</label>
          <input
            type="email"
            class="form-control"
            id="knifeName"
            placeholder="e.g. 300MM YANAGIBA HAYATE (RIGHT HAND USE)"
          />
        </div>
        <div class="form-group">
          <label for="rrp col-form-label">Recommended Retail Price</label>
          <input
            type="number"
            class="form-control"
            id="rrp"
            placeholder="e.g.100"
          />
        </div>
        <div class="form-group">
          <label for="productQuantity col-form-label">Quantity</label>
          <input
            type="number"
            class="form-control"
            id="productQuantity"
            placeholder="e.g. 5"
          />
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile" />
          <label class="custom-file-label" for="customFile">
            Upload image
          </label>
        </div>
        <div className="productButton">
          <div className="productBtn">
            <Link to="/products">
              <button type="button" className="btn btn-default btn-lg info">
                Cancel
              </button>
            </Link>
          </div>
          <div className="productBtn">
            <Link to="/products">
              <button type="button" className="btn btn-primary btn-lg info">
                Save
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm
