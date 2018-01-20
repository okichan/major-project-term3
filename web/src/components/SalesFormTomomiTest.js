import React, { Component, Fragment } from "react";
import { listProducts } from "../api/products";
import { listCustomers } from "../api/customers";
import { createSale } from "../api/sales";

import DatePicker from "react-datepicker";
import moment from "moment";

class SalesFormTomomiTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      productID: [],
      productPrice: [],
      unitAmount: ["1"],
      totalPrice: null,
      count: 1,
      products: null,
      customers: null,
      startDate: moment()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  getTotalPrice() {
    const salePrices = this.state.productPrice.map((pro, index) => {
      return Number(pro) * Number(this.state.unitAmount[index]);
    });
    this.setState({
      totalPrice: salePrices.reduce((a, b) => a + b, 0)
    });
  }

  handleChangeValue(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleChangeProduct(i, event) {
    let productID = this.state.productID.slice();
    productID[i] = event.target.value;
    this.setState({ productID }, () => {
      let productPrice = this.state.productPrice.slice();
      const product = this.state.products.filter(product => {
        return product._id === productID[i];
      })[0];
      productPrice[i] = !!product ? product.price : 0;

      this.setState({ productPrice });
    });
  }

  handleChangeAmount(i, event) {
    let unitAmount = this.state.unitAmount.slice();
    unitAmount[i] = event.target.value;
    this.setState({ unitAmount }, () => {
      this.getTotalPrice();
    });
  }

  handleChangePrice(i, event) {
    let productPrice = this.state.productPrice.slice();
    productPrice[i] = event.target.value;
    this.setState({ productPrice }, () => {
      this.getTotalPrice();
    });
  }

  handleChangeDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const elements = form.elements;

    const date = elements.date.value;
    const productPrice = this.state.productPrice; // array of productPrice
    const unitAmount = this.state.unitAmount; // array of unit unitAmount
    const type = elements.type.value; // store or online
    const customer = elements.phone.value; // customer._id
    const totalPrice = this.state.totalPrice;

    const products = [];
    this.state.productID.map((m, index) => {
      let product = { product: m };
      product["salePrice"] = productPrice[index] * unitAmount[index];
      product["unitAmount"] = unitAmount[index];
      products.push(product);
    });

    this.onCreateSale({ date, products, type, customer, totalPrice })
  }

  onCreateSale = customerData => {
    debugger;
    createSale(customerData)
      .then(newSale => {
        window.location.href = "/sales";
      })
      .catch(error => {
        console.error(error);
      });
  };

  addClick() {
    this.setState({ count: this.state.count + 1 });
    this.setState(prevState => {
      const updateUnitAmount = prevState.unitAmount.push("1");
    });
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    });
    this.setState(
      prevState => {
        const updateSalePrice = prevState.productPrice.splice(i, 1);
        const updateProductId = prevState.productID.splice(i, 1);
        const updateUnitAmount = prevState.unitAmount.splice(i, 1);
      },
      () => {
        this.getTotalPrice();
      }
    );
  }

  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div key={i} className="row ">
          <select
            onChange={this.handleChangeProduct.bind(this, i)}
            name="product"
            className="col"
          >
            <option value="" />
            {this.state.products.map(product => {
              return (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            value={this.state.productPrice[i] || ""}
            onChange={this.handleChangePrice.bind(this, i)}
            placeholder="Price"
            className="col-2"
          />
          <input
            type="number"
            value={this.state.unitAmount[i] || ""}
            onChange={this.handleChangeAmount.bind(this, i)}
            placeholder="Amount"
            className="col-2"
            min={1}
          />
          <input
            type="button"
            value="remove"
            onClick={this.removeClick.bind(this, i)}
          />
        </div>
      );
    }
    return uiItems || null;
  }

  render() {
    const { value, count, products, customers, startDate } = this.state;
    return (
      <Fragment>
        {customers &&
          products && (
            <form onSubmit={this.handleSubmit}>
              <DatePicker
                dateFormat="YYYY/MM/DD"
                selected={startDate}
                onChange={this.handleChangeDate}
                className="form-control"
                name="date"
              />

              {/* generate dynamic form */}
              {this.createUI()}

              <input
                type="button"
                value="add more"
                onClick={this.addClick.bind(this)}
              />
              <hr />
              <input
                type="radio"
                name="type"
                id="store"
                value="store"
                required
              />
              <label className="form-check-label">Store</label>
              <input type="radio" name="type" id="online" value="online" />
              <label className="form-check-label">Online</label>
              <hr />
              {/* <input type="radio" name="customer" id="store" value="store" required /> */}
              {/* <label className="form-check-label">New customer</label> */}
              {/* <input type="radio" name="customer" id="online" value="online" /> */}
              {/* <label className="form-check-label">Return</label> */}
              {/* <hr /> */}
              <select name="phone">
                <option value="" />
                {customers.map(m => {
                  return (
                    <option key={m._id} name={m._id} value={m._id}>
                      {m.phone} -{" "}
                      {m.firstName === "" ? "(unknown)" : m.firstName}{" "}
                      {m.lastName === "" ? "" : m.lastName}
                    </option>
                  );
                })}
              </select>
              <hr />
              <input type="submit" value="Submit" />
            </form>
          )}
      </Fragment>
    );
  }

  load() {
    listProducts().then(products => {
      this.setState({ products });
    });

    listCustomers().then(customers => {
      this.setState({ customers });
    });
  }
  componentDidMount() {
    this.load();
  }
}

export default SalesFormTomomiTest;
