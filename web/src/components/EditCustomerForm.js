import React from 'react'
import { Link } from 'react-router-dom'

function EditCustomerForm({ products, submitTitle, onSubmit }) {
  return (
    <div className="container">
      <h1 className="text-center mb-5">Edit Customer</h1>

      <div className="">
        <form
          className=""
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
          <fieldset class="form-group">
            <legend>Gender</legend>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender1"
                  value="option1"
                />
                Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="gender2"
                  value="option2"
                />
                Female
              </label>
            </div>
          </fieldset>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">
              First Name
            </label>
            <div class="col-10">
              <input
                class="form-control"
                type="text"
                placeholder="Tomomi"
                id="example-text-input"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">
              Last Name
            </label>
            <div class="col-10">
              <input
                class="form-control"
                type="text"
                placeholder="Oki"
                id="example-text-input"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">
              Email
            </label>
            <div class="col-10">
              <input
                class="form-control"
                type="text"
                placeholder="test@gmail.com"
                id="example-text-input"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">
              Phone number
            </label>
            <div class="col-10">
              <input
                class="form-control"
                type="text"
                placeholder="0412345678"
                id="example-text-input"
              />
            </div>
          </div>

          <fieldset class="form-group row">
            <legend>Customer Origin</legend>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin1"
                  value="option1"
                />
                Family / Friend / Colleague
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin2"
                  value="option2"
                />
                Online
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin3"
                  value="option3"
                />
                SNS (Facebook, Twitter etc)
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin4"
                  value="option4"
                />
                Walk In
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin4"
                  value="option4"
                />
                QT Hotel Guest
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="customerorigin"
                  id="customerorigin5"
                  value="option5"
                />
                Newspaper Article
              </label>
            </div>
            <div class="form-group row">
              <label for="example-text-input" class="col-2 col-form-label">
                Other
              </label>
              <div class="col-10">
                <input
                  class="form-control"
                  type="text"
                  placeholder="e.g. Pigeon Carrier"
                  id="example-text-input"
                />
              </div>
            </div>
            <fieldset class="form-group">
              <legend>Customer Occupation</legend>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="occupation"
                    id="occupation1"
                    value="occupation1"
                  />
                  Chef
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="occupation"
                    id="occupation2"
                    value="occupation2"
                  />
                  Non-Chef
                </label>
              </div>
            </fieldset>
            <div class="form-group">
              <label for="exampleTextarea">Notes</label>
              <textarea class="form-control" id="exampleTextarea" rows="3" />
            </div>
          </fieldset>
          <div className="customerBtn">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block info"
            >
              Save
            </button>
          </div>
          <div className="customerBtn">
            <Link to="/customer">
              <button
                type="button"
                className="btn btn-default btn-lg btn-block info"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCustomerForm
