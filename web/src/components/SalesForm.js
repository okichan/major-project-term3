import React, { Component } from "react";
import SalesItem from "./SalesItem";
import CustomerFormNew from "./CustomerFormNew";
import CustomerFormReturn from "./CustomerFormReturn";
import { listProducts } from "../api/products";

class SalesForm extends Component {
  state = {
    products: null,
    saleItems: 1,
    value: [],
    customer: true
  };

  componentDidMount() {
    listProducts()
      .then(products => {
        this.setState({ products: products });
      })
      .catch(error => {
        this.setState({ error: error });
        console.log("Error loading currency conversion", error);
      });
  }

  addItem() {
    this.setState({
      saleItems: this.state.saleItems + 1
    });
  }

  deleteItem() {
    this.setState({
      saleItems: this.state.saleItems - 1
    });
  }

  displayItems() {
    let forms = [];
    for (let i = 0; i < this.state.saleItems; i++) {
      forms.push(
        <div key={i}>
          <SalesItem
            products={this.state.products}
            value={this.state.value[i] || ""}
          />
        </div>
      );
    }
    return forms || null;
  }

  customerType() {
    this.setState({
      customer: !this.state.customer
    });
  }

  render() {
    const { products, saleItems, customer } = this.state;
    return (
      <div className="col salesForm">
        <h1 className="salesFormHeading text-center mb-5">New sales</h1>

        {products && (
          <form
            className=""
            // onSubmit={event => {
            //   // Prevent old-school form submission
            //   event.preventDefault();

            //   const form = event.target;
            //   const elements = form.elements; // Allows looking up fields using their 'name' attributes
            //   // Get entered values from fields
            //   const brandName = elements.brandName.value;
            //   const name = elements.name.value;

            //   // Pass this information along to the parent component
            //   onSubmit({ brandName, name });
            // }}
          >
            <fieldset>
              <div className="form-group text-center">
                <div className="col">
                  <label className="control-label mr-3">Date</label>
                  <i className="fa fa-calendar mr-1" />
                  <input type="date" />
                </div>
              </div>
              {this.displayItems()}
              <div className="saleButtons">
                <button
                  className="fa fa-minus-circle saleButtonDelete saleButton"
                  type="button"
                  onClick={this.deleteItem.bind(this)}
                >
                  {" "}
                </button>
                <button
                  className="fa fa-plus-circle saleButtonAdd saleButton"
                  type="button"
                  onClick={this.addItem.bind(this)}
                >
                  {" "}
                </button>
              </div>
              <br />
              <div className="col text-center">
                <div class="form-check form-check-inline">
                  Online purchase{"  "}
                  <input
                    class="form-check-input"
                    type="radio"
                    name="onlinePurchase"
                    id="onlinePurchaseYes"
                    value="option1"
                  />
                  <label class="form-check-label" for="onlinePurchaseYes">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="onlinePurchase"
                    id="onlinePurchaseNo"
                    value="option2"
                  />
                  <label class="form-check-label" for="onlinePurchaseNo">
                    No
                  </label>
                </div>
              </div>
              <br />
              <div className="salesCustomerInfo">
                <div className="salesCustomerInfoBtnContainer">
                  <div className="salesCustomerInfoBtn">
                    <h2 className="text-center">Customer</h2>
                    <button
                      className="text-center"
                      type="button"
                      onClick={this.customerType.bind(this)}
                    >
                      Returning?
                    </button>
                  </div>
                </div>
                <br />
                {customer ? <CustomerFormNew /> : <CustomerFormReturn />}
              </div>

              <div className="salesSubmitButton">
                <button
                  type="button"
                  className="btn btn-default btn-lg btn-block info salesButton2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block info salesButton2"
                >
                  Save
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </div>
    );
  }
}

export default SalesForm;
