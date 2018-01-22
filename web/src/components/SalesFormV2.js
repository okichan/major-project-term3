import React, { Component, Fragment } from "react";
import { listProducts } from "../api/products";
import { listCustomers, createCustomer } from "../api/customers";
import { createSale } from "../api/sales";
import CustomerForm from "./CustomerForm";
import ProductFilterForNewSale from "./ProductFilterForNewSale";

import DatePicker from "react-datepicker";
import moment from "moment";

class SalesFormV2 extends Component {
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
      startDate: moment(),
      newCustomer: false,
      selectedCustomer: null,
      filteredProducts: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  onProductFilter = (countKey, query) => {
    const matchProducts = this.state.products.filter(product => {
      return product.category === query;
    });
    if (query !== "") {
      this.setState(prevState => {
        const updatedProducts = prevState.filteredProducts;
        updatedProducts[countKey] = matchProducts;
        return { filteredProducts: updatedProducts };
      });
    } else {
      this.setState(prevState => {
        const updatedProducts = prevState.filteredProducts;
        updatedProducts[countKey] = this.state.products;
        return { filteredProducts: updatedProducts };
      });
    }
  };

  onCreateCustomer = customerData => {
    createCustomer(customerData)
      .then(newCustomer => {
        this.setState(prevState => {
          // Append to existing customers array
          const updatedCustomers = prevState.customers.concat(newCustomer);
          return {
            customers: updatedCustomers
          };
        });
        this.setState({ selectedCustomer: newCustomer._id });
        this.setState({ newCustomer: !this.state.newCustomer });
        alert("Add new Customer");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  getTotalPrice() {
    const salePrices = this.state.productPrice.map((pro, index) => {
      return Number(pro) * Number(this.state.unitAmount[index]);
    });
    this.setState({
      totalPrice: salePrices.reduce((a, b) => a + b, 0)
    });
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

      this.setState({ productPrice }, () => {
        this.getTotalPrice();
      });
    });
  }

  handleChangeAmount(i, event) {
    let unitAmount = this.state.unitAmount.slice();
    unitAmount[i] = event.target.value;

    if (this.state.productID[i]) {
      //check if stock is ok
      const correspondingProduct = this.state.products.filter(product => {
        return this.state.productID[i] === product._id;
      })[0];
      if (Number(correspondingProduct.stock) < Number(unitAmount[i])) {
        // stock validation failed
        alert(
          `Amount can not exceed ${correspondingProduct.title}'s stock (${
            correspondingProduct.stock
          })`
        );
      } else {
        // stock validation passed
        this.setState({ unitAmount }, () => {
          this.getTotalPrice();
        });
      }
    }
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
    const customer = this.state.selectedCustomer; // customer._id
    const totalPrice = this.state.totalPrice;

    const products = [];
    this.state.productID.map((m, index) => {
      let product = { product: m };
      product["salePrice"] = productPrice[index] * unitAmount[index];
      product["unitAmount"] = unitAmount[index];
      products.push(product);
    });

    this.onCreateSale({ date, products, type, customer, totalPrice });
  }

  onCreateSale = saleData => {
    createSale(saleData)
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
    this.setState(prevState => {
      const updateFilteredProducts = prevState.filteredProducts.push(
        this.state.products
      );
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
        const updateFilteredProducts = prevState.filteredProducts.splice(i, 1);
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
        <div key={i} className="form-row ">
          <div className="form-group col-10">
            <label>Product</label>
            <ProductFilterForNewSale
              prodCategory={this.onProductFilter}
              countKey={i}
            />
            <select
              onChange={this.handleChangeProduct.bind(this, i)}
              name="product"
              className="form-control"
              required
            >
              <option value="" />
              {this.state.filteredProducts[i].map(product => {
                return (
                  <option key={product._id} value={product._id}>
                    {product.category} - {product.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-2">
            <label>&#160;</label>
            <button
              onClick={this.removeClick.bind(this, i)}
              className="form-control"
              style={{ border: "0px", backgroundColor: "transparent" }}
            >
              <i className="fa fa-times-circle-o med pointer" id="trash" />
            </button>
          </div>
          <div className="form-group col-4 ">
            <label>RRP</label>
            <input
              type="number"
              value={this.state.productPrice[i] || ""}
              onChange={this.handleChangePrice.bind(this, i)}
              placeholder="Price"
              className="form-control"
            />
          </div>
          <div className="form-group col-8 " id="dummy" />

          <div className="form-group col-5 col-sm-4">
            <label>Amount</label>
            <div className="input-group">
              <div
                className="input-group-prepend pointer"
                onClick={() => {
                  const updatedUnitAmount = this.state.unitAmount.slice();
                  updatedUnitAmount[i] =
                    Number(updatedUnitAmount[i]) - 1 < 1
                      ? 1
                      : Number(updatedUnitAmount[i]) - 1;

                  this.setState({ unitAmount: updatedUnitAmount }, () => {
                    this.getTotalPrice();
                  });
                }}
              >
                <i className="fa fa-minus input-group-text" />
              </div>
              <input
                type="number"
                id="amount"
                value={this.state.unitAmount[i] || ""}
                onChange={this.handleChangeAmount.bind(this, i)}
                placeholder="Amount"
                className="form-control text-center"
                min={1}
              />
              <div
                className="input-group-append pointer"
                onClick={() => {
                  const updatedUnitAmount = this.state.unitAmount.slice();
                  updatedUnitAmount[i] =
                    Number(updatedUnitAmount[i]) + Number(1);
                  if (this.state.productID[i]) {
                    //check if stock is ok
                    const correspondingProduct = this.state.products.filter(
                      product => {
                        return this.state.productID[i] === product._id;
                      }
                    )[0];
                    if (
                      Number(correspondingProduct.stock) <
                      Number(updatedUnitAmount[i])
                    ) {
                      // stock validation failed
                      alert(
                        `Amount can not exceed ${
                          correspondingProduct.title
                        }'s stock (${correspondingProduct.stock})`
                      );
                    } else {
                      // stock validation passed
                      this.setState({ unitAmount: updatedUnitAmount }, () => {
                        this.getTotalPrice();
                      });
                    }
                  }
                }}
              >
                <i className="fa fa-plus input-group-text" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return uiItems || null;
  }

  render() {
    const {
      value,
      count,
      products,
      customers,
      startDate,
      newCustomer
    } = this.state;

    return (
      <Fragment>
        {customers &&
          products && (
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 col-lg-6 mx-auto mb-5"
            >
              <div className="form-group">
                <label>Date</label>
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  selected={startDate}
                  onChange={this.handleChangeDate}
                  className="form-control"
                  name="date"
                />
              </div>

              {/* generate dynamic form */}
              {this.createUI()}

              <label
                onClick={this.addClick.bind(this)}
                className="pointer"
                id="trash"
              >
                <i className="fa fa-plus-circle med mt-2" /> add more
              </label>
              <hr />
              <h2>
                {`Total ${this.state.totalPrice ? this.state.totalPrice : 0} $`}
              </h2>
              <hr />

              <div className="form-group">
                <label className="form-check pointer">
                  <input
                    type="radio"
                    name="type"
                    id="store"
                    value="store"
                    required
                    className="form-check-input"
                  />
                  Store
                </label>
              </div>
              <div className="form-group">
                <label className="form-check pointer">
                  <input
                    type="radio"
                    name="type"
                    id="online"
                    value="online"
                    className="form-check-input"
                  />
                  Online
                </label>
              </div>
              <hr />
              {/* <input type="radio" name="customer" id="store" value="store" required /> */}
              {/* <label className="form-check-label">New customer</label> */}
              {/* <input type="radio" name="customer" id="online" value="online" /> */}
              {/* <label className="form-check-label">Return</label> */}
              {/* <hr /> */}

              <div className="input-group ">
                <div className="input-group-prepend ">
                  <i className="fa fa-user input-group-text" />
                  <select
                    name="phone"
                    required
                    className="form-control  col-sm-9 col-md-10"
                    value={
                      this.state.selectedCustomer
                        ? this.state.selectedCustomer
                        : undefined
                    }
                    onChange={e => {
                      const id = e.target.value;
                      this.setState({ selectedCustomer: id });
                    }}
                  >
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
                </div>
                <input
                  type="checkbox"
                  onClick={e => {
                    this.setState({ newCustomer: e.target.checked });
                  }}
                  id="create-new-customer"
                  className="notification-checkbox sr-only"
                />
                <label
                  htmlFor="create-new-customer"
                  className=" pointer text-info"
                >
                  Create new
                </label>
              </div>

              <hr />
              <input
                type="submit"
                className="btn btn-primary btn-lg col"
                value="Create Sale"
              />
            </form>
          )}
        {newCustomer && (
          <CustomerForm
            customers={customers}
            submitTitle="Create Customer"
            onSubmit={this.onCreateCustomer}
          />
        )}
      </Fragment>
    );
  }

  load() {
    listProducts().then(products => {
      this.setState({ products, filteredProducts: [products] });
      var sortedData = [].slice
        .call(products)
        .sort((x, y) => x.category.toUpperCase() > y.category.toUpperCase());
      this.setState({ products: sortedData });
    });

    listCustomers().then(customers => {
      customers.sort((x, y) => x.phone > y.phone);
      this.setState({ customers });
    });
  }
  componentDidMount() {
    this.load();
  }
}

export default SalesFormV2;
