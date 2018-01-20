import React, { Component } from "react";
import { listProducts } from "../api/products";
import { listCustomers, listFilteredCustomers } from "../api/customers";
import { listSales, updateSale } from "../api/sales";
import { Link } from "react-router-dom";
import SalesItem from "./SalesItem";

class SalesFormEdit extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    date: null,
    products: null,
    customers: null,
    filteredCustomers: null,
    customerone: null,
    value: [],
    sales: null,
    productPrice0: null,
    productPrice1: null,
    productPrice2: null,
    productPrice3: null,
    productPrice4: null,
    productQuantity0: null,
    productQuantity1: null,
    productQuantity2: null,
    productQuantity3: null,
    productQuantity4: null,
    textEntered: null
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

    listCustomers()
      .then(customers => {
        this.setState({ customers: customers });
      })
      .catch(error => {
        this.setState({ error: error });
        console.log("Error loading currency conversion", error);
      });
  }

  load() {
    const saveError = error => {
      this.setState({ error });
    };

    // Available to anyone
    this.listSales().then(sales => {
      this.setState({ sales: sales });
    });
  }

  showhide(id) {
    var mydiv = document.getElementById(id);
    if (mydiv.style.display === "" || mydiv.style.display === "block")
      mydiv.style.display = "none";
    else mydiv.style.display = "block";
  }

  onChangeNumber = number => {
    const { customers } = this.state;
    const chosenNumber = customers.filter(customer => {
      return customer._id === number;
    })[0];
    this.setState({ customerone: chosenNumber.id });
  };

  onChangeTitle = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ [`productPrice${number}`]: chosenProduct.price });
  };

  onChangePrice = (number, e) => {
    const value = e.target.value;
    this.setState({ [`productPrice${number}`]: value });
  };

  onChangeQuantity = (number, e) => {
    const value = e.target.value;
    this.setState({ [`productQuantity${number}`]: value });
  };

  totalSales() {
    const {
      productPrice0,
      productPrice1,
      productPrice2,
      productPrice3,
      productPrice4,
      productQuantity0,
      productQuantity1,
      productQuantity2,
      productQuantity3,
      productQuantity4
    } = this.state;
    return (
      productPrice0 * productQuantity0 +
      productPrice1 * productQuantity1 +
      productPrice2 * productQuantity2 +
      productPrice3 * productQuantity3 +
      productPrice4 * productQuantity4
    );
  }

  onEditSale = data => {
    updateSale(data._id, data)
      .then(updatedSale => {
        window.location.href = "/sales";
        this.setState(prevState => {
          const updatedSales = prevState.sales.map(sale => {
            if (sale._id === updatedSale._id) {
              return updatedSale;
            } else {
              return sale;
            }
          });
          return {
            sales: updatedSales
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  filterCustomers = event => {
    event.preventDefault(); // Prevent the form submission

    const { textEntered } = this.state;

    listFilteredCustomers(textEntered)
      .then(customers => {
        this.setState({ customers: customers });
      })
      .catch(error => {
        alert(`"${textEntered}" phone number does not belong to a customer!`);
      });
  };

  onChangeTextEntered = event => {
    const input = event.target;
    const value = input.value;
    this.setState({
      textEntered: value
    });
  };

  goBack() {
    window.history.back();
  }

  productPrice(number) {
    if (number === 0) {
      return this.state.productPrice0;
    } else if (number === 1) {
      return this.state.productPrice1;
    } else if (number === 2) {
      return this.state.productPrice2;
    } else if (number === 3) {
      return this.state.productPrice3;
    } else if (number === 4) return this.state.productPrice4;
  }

  productQuantity(number) {
    if (number === 0) {
      return this.state.productQuantity0;
    } else if (number === 1) {
      return this.state.productQuantity1;
    } else if (number === 2) {
      return this.state.productQuantity2;
    } else if (number === 3) {
      return this.state.productQuantity3;
    } else if (number === 4) return this.state.productQuantity4;
  }

  render() {
    const {
      products,
      customers,
      saleItems,
      customer,
      customerone,
      productPrice0,
      productPrice1,
      productPrice2,
      productPrice3,
      productPrice4,
      productQuantity0,
      productQuantity1,
      productQuantity2,
      productQuantity3,
      productQuantity4,
      sales,
      textEntered
    } = this.state;

    return (
      <div className="col salesForm">
        {products && (
          <form
            id={`editSaleForm-${this.props.saleId._id}`}
            className=""
            onSubmit={event => {
              event.preventDefault();

              var product = [];
              var sale = {};
              let product1 = {};
              let product2 = {};
              let product3 = {};
              let product4 = {};
              let product5 = {};

              const form = event.target;
              const elements = form.elements;

              const date = elements.date.value;
              const customer = elements.customer.value;
              const totalPrice = elements.totalPrice.value;
              const type = elements.type.value;
              const id0 = elements.id[0].value;
              const salePrice0 = elements.salePrice[0].value;
              const unitAmount0 = elements.unitAmount[0].value;
              const id1 = elements.id[1].value;
              const salePrice1 = elements.salePrice[1].value;
              const unitAmount1 = elements.unitAmount[1].value;
              const id2 = elements.id[2].value;
              const salePrice2 = elements.salePrice[2].value;
              const unitAmount2 = elements.unitAmount[2].value;
              const id3 = elements.id[3].value;
              const salePrice3 = elements.salePrice[3].value;
              const unitAmount3 = elements.unitAmount[3].value;
              const id4 = elements.id[4].value;
              const salePrice4 = elements.salePrice[4].value;
              const unitAmount4 = elements.unitAmount[4].value;

              product1["product"] = id0;
              product1["salePrice"] = salePrice0;
              product1["unitAmount"] = unitAmount0;
              product2["product"] = id1;
              product2["salePrice"] = salePrice1;
              product2["unitAmount"] = unitAmount1;
              product3["product"] = id2;
              product3["salePrice"] = salePrice2;
              product3["unitAmount"] = unitAmount2;
              product4["product"] = id3;
              product4["salePrice"] = salePrice3;
              product4["unitAmount"] = unitAmount3;
              product5["product"] = id4;
              product5["salePrice"] = salePrice4;
              product5["unitAmount"] = unitAmount4;

              product.push(product1, product2, product3, product4, product5);
              const result = product.filter(pro => {
                return pro.unitAmount !== "";
              });

              sale.products = result;
              sale.date = date;
              sale.customer = customer;
              sale.totalPrice = totalPrice;
              sale.type = type;

              this.onUpdateSale(sale);
            }}
          >
            <fieldset>
              <div className="form-group text-center">
                <div className="col">
                  <label className="control-label mr-3">Date</label>
                  <i className="fa fa-calendar mr-1" />
                  <input type="date" name="date" />
                </div>
              </div>

              {this.props.saleId.products.map((productInfo, i) => {
                var s = (
                  <SalesItem
                    itemNumber={i}
                    products={products}
                    saleId={this.props.saleId}
                    productPrice={this.productPrice(i)}
                    productQuantity={this.productQuantity(i)}
                    onChangeTitle={this.onChangeTitle}
                    onChangePrice={this.onChangePrice}
                    onChangeQuantity={this.onChangeQuantity}
                  />
                );
                return s;
              })}

              <div className="salePrice text-center">
                <div className="salePriceHeading">
                  <h2>Total Price:</h2>
                </div>
                <div className="salePricePrice">
                  <h2>
                    <input name="totalPrice" value={this.totalSales()} />
                  </h2>
                </div>
              </div>

              <div className="form-group">
                <div className="col">
                  <label className="control-label">Type of Purchase</label>
                  <div className="input-group">
                    <select name="type" className="form-control">
                      {this.props.saleId.type === "store" ? (
                        <option value="store">Store</option>
                      ) : (
                        <option value="online">Online</option>
                      )}
                      {this.props.saleId.type === "store" ? (
                        <option value="online">Online</option>
                      ) : (
                        <option value="store">Store</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Search */}
              {!!customers ? (
                <div className="customerSearchBar">
                  <div className="text-center customerSearchBarHeading ">
                    <h2>Customer</h2>
                  </div>
                  <div className="saleSearchBar">
                    <button
                      className="fa fa-search saleSearchBarButton"
                      onClick={this.filterCustomers}
                    />
                    <div className="col saleSearchInput">
                      <div className="phoneSearchInput">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone number"
                          value={this.textEntered}
                          onChange={this.onChangeTextEntered}
                        />
                      </div>

                      <select name="customer" className="form-control">
                        <option value="">Please select customer</option>
                        {customers.map(c => {
                          if (this.props.saleId.customer._id === c._id) {
                            return (
                              <option value={c._id} selected="selected">
                                {c.firstName}
                              </option>
                            );
                          } else {
                            return <option value={c._id}>{c.firstName}</option>;
                          }
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading</p>
              )}
            </fieldset>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                form={`editSaleForm-${this.props.saleId._id}`}
              >
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default SalesFormEdit;
