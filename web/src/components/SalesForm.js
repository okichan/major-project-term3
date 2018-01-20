import React, { Component } from "react";
import { listProducts } from "../api/products";
import { listCustomers, listFilteredCustomers } from "../api/customers";
import { listSales, createSale, deleteSale } from "../api/sales";
import { Link } from "react-router-dom";

class SalesForm extends Component {
  state = {
    products: null,
    customers: null,
    filteredCustomers: null,
    customerone: null,
    value: [],
    sales: null,
    productPrice1: null,
    productPrice2: null,
    productPrice3: null,
    productPrice4: null,
    productPrice5: null,
    productQuantity1: null,
    productQuantity2: null,
    productQuantity3: null,
    productQuantity4: null,
    productQuantity5: null,
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

  onChangeTitle1 = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ productPrice1: chosenProduct.price });
  };

  onChangeTitle2 = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ productPrice2: chosenProduct.price });
  };
  onChangeTitle3 = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ productPrice3: chosenProduct.price });
  };
  onChangeTitle4 = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ productPrice4: chosenProduct.price });
  };
  onChangeTitle5 = (number, id) => {
    const { products } = this.state;
    const chosenProduct = products.filter(product => {
      return product._id === id;
    })[0];
    this.setState({ productPrice5: chosenProduct.price });
  };
  onChangePrice1 = e => {
    const value = e.target.value;
    this.setState({ productPrice1: value });
  };
  onChangePrice2 = e => {
    const value = e.target.value;
    this.setState({ productPrice2: value });
  };
  onChangePrice3 = e => {
    const value = e.target.value;
    this.setState({ productPrice3: value });
  };
  onChangePrice4 = e => {
    const value = e.target.value;
    this.setState({ productPrice4: value });
  };
  onChangePrice5 = e => {
    const value = e.target.value;
    this.setState({ productPrice5: value });
  };
  onChangeQuantity1 = e => {
    const value = e.target.value;
    this.setState({ productQuantity1: value });
  };
  onChangeQuantity2 = e => {
    const value = e.target.value;
    this.setState({ productQuantity2: value });
  };
  onChangeQuantity3 = e => {
    const value = e.target.value;
    this.setState({ productQuantity3: value });
  };
  onChangeQuantity4 = e => {
    const value = e.target.value;
    this.setState({ productQuantity4: value });
  };
  onChangeQuantity5 = e => {
    const value = e.target.value;
    this.setState({ productQuantity5: value });
  };

  totalSales() {
    const {
      productPrice1,
      productPrice2,
      productPrice3,
      productPrice4,
      productPrice5,
      productQuantity1,
      productQuantity2,
      productQuantity3,
      productQuantity4,
      productQuantity5
    } = this.state;
    return (
      productPrice1 * productQuantity1 +
      productPrice2 * productQuantity2 +
      productPrice3 * productQuantity3 +
      productPrice4 * productQuantity4 +
      productPrice5 * productQuantity5
    );
  }

  onCreateSale = saleData => {
    createSale(saleData)
      .then(newSale => {
        this.setState(prevState => {
          // Append to existing products array
          const updatedSales = prevState.products.concat(newSale);
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
  render() {
    const {
      products,
      customers,
      saleItems,
      customer,
      customerone,
      productPrice1,
      productPrice2,
      productPrice3,
      productPrice4,
      productPrice5,
      productQuantity1,
      productQuantity2,
      productQuantity3,
      productQuantity4,
      productQuantity5,
      sales,
      textEntered
    } = this.state;

    return (
      <div className="col salesForm">
        <h1 className="salesFormHeading text-center mb-5">New sales</h1>
        {products && (
          <form
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
              const elements = form.elements; // Allows looking up fields using their 'name' attributes
              // Get entered values from fields

              const date = elements.date.value;
              const customer = elements.customer.value;
              const totalPrice = elements.totalPrice.value;
              const type = elements.type.value;
              const id1 = elements.id[0].value;
              const salePrice1 = elements.salePrice[0].value;
              const unitAmount1 = elements.unitAmount[0].value;
              const id2 = elements.id[1].value;
              const salePrice2 = elements.salePrice[1].value;
              const unitAmount2 = elements.unitAmount[1].value;
              const id3 = elements.id[2].value;
              const salePrice3 = elements.salePrice[2].value;
              const unitAmount3 = elements.unitAmount[2].value;
              const id4 = elements.id[3].value;
              const salePrice4 = elements.salePrice[3].value;
              const unitAmount4 = elements.unitAmount[3].value;
              const id5 = elements.id[4].value;
              const salePrice5 = elements.salePrice[4].value;
              const unitAmount5 = elements.unitAmount[4].value;

              product1["product"] = id1;
              product1["salePrice"] = salePrice1;
              product1["unitAmount"] = unitAmount1;
              product2["product"] = id2;
              product2["salePrice"] = salePrice2;
              product2["unitAmount"] = unitAmount2;
              product3["product"] = id3;
              product3["salePrice"] = salePrice3;
              product3["unitAmount"] = unitAmount3;
              product4["product"] = id4;
              product4["salePrice"] = salePrice4;
              product4["unitAmount"] = unitAmount4;
              product5["product"] = id5;
              product5["salePrice"] = salePrice5;
              product5["unitAmount"] = unitAmount5;

              product.push(product1, product2, product3, product4, product5);
              const result = product.filter(pro => {
                return pro.unitAmount !== "";
              });

              sale.products = result;
              sale.date = date;
              sale.customer = customer;
              sale.totalPrice = totalPrice;
              sale.type = type;

              this.onCreateSale(sale);
              window.location.href = "/sales";
              return false;
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
              {/* First Sale Item */}
              <div className="col" id="saleitem1">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="id"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle1(1, e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        Please select product
                      </option>
                      {products.map(m => (
                        <option value={m._id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="salePrice"
                        className="form-control"
                        value={
                          this.state.productPrice1
                            ? this.state.productPrice1
                            : "0"
                        }
                        type="number"
                        onChange={e => {
                          this.onChangePrice1(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Quantity</label>
                    <div className="input-group">
                      <input
                        name="unitAmount"
                        type="number"
                        className="form-control"
                        min="1"
                        value={
                          this.state.productQuantity1
                            ? this.state.productQuantity1
                            : ""
                        }
                        onChange={e => {
                          this.onChangeQuantity1(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="fa fa-plus-circle"
                  onClick={e => {
                    e.preventDefault();
                    this.showhide("secondSaleItem");
                  }}
                />
              </div>
              {/* Second Sale Item */}
              <div className="col salesItem" id="secondSaleItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="id"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle2(2, e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        Please select product
                      </option>
                      {products.map(m => (
                        <option value={m._id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="salePrice"
                        className="form-control"
                        type="number"
                        value={
                          this.state.productPrice2
                            ? this.state.productPrice2
                            : "0"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Quantity</label>
                    <div className="input-group">
                      <input
                        name="unitAmount"
                        type="number"
                        className="form-control"
                        min="1"
                        value={
                          this.state.productQuantity2
                            ? this.state.productQuantity2
                            : ""
                        }
                        onChange={e => {
                          this.onChangeQuantity2(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="fa fa-plus-circle"
                  onClick={e => {
                    e.preventDefault();
                    this.showhide("thirdSaleItem");
                  }}
                />
              </div>
              {/* Third Sale Item */}
              <div className="col salesItem" id="thirdSaleItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="id"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle3(3, e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        Please select product
                      </option>
                      {products.map(m => (
                        <option value={m._id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="salePrice"
                        className="form-control"
                        value={
                          this.state.productPrice3
                            ? this.state.productPrice3
                            : "0"
                        }
                        type="number"
                        onChange={e => {
                          this.onChangePrice3(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Quantity</label>
                    <div className="input-group">
                      <input
                        name="unitAmount"
                        type="number"
                        className="form-control"
                        min="1"
                        value={
                          this.state.productQuantity3
                            ? this.state.productQuantity3
                            : ""
                        }
                        onChange={e => {
                          this.onChangeQuantity3(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="fa fa-plus-circle"
                  onClick={e => {
                    e.preventDefault();
                    this.showhide("forthSaleItem");
                  }}
                />
              </div>
              {/* Fourth Sale Item */}
              <div className="col salesItem" id="forthSaleItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="id"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle4(4, e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        Please select product
                      </option>
                      {products.map(m => (
                        <option value={m._id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="salePrice"
                        className="form-control"
                        value={
                          this.state.productPrice4
                            ? this.state.productPrice4
                            : "0"
                        }
                        type="number"
                        onChange={e => {
                          this.onChangePrice4(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Quantity</label>
                    <div className="input-group">
                      <input
                        name="unitAmount"
                        type="number"
                        className="form-control"
                        min="1"
                        value={
                          this.state.productQuantity4
                            ? this.state.productQuantity4
                            : ""
                        }
                        onChange={e => {
                          this.onChangeQuantity4(e);
                        }}
                      />
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="fa fa-plus-circle"
                  onClick={e => {
                    e.preventDefault();
                    this.showhide("fifthSaleItem");
                  }}
                />
              </div>
              {/* Fifth Sale Item */}
              <div className="col salesItem" id="fifthSaleItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="id"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle5(5, e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        Please select product
                      </option>
                      {products.map(m => (
                        <option value={m._id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="salePrice"
                        className="form-control"
                        value={
                          this.state.productPrice5
                            ? this.state.productPrice5
                            : "0"
                        }
                        type="number"
                        onChange={e => {
                          this.onChangePrice1(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Quantity</label>
                    <div className="input-group">
                      <input
                        name="unitAmount"
                        type="number"
                        className="form-control"
                        min="1"
                        value={
                          this.state.productQuantity5
                            ? this.state.productQuantity5
                            : ""
                        }
                        onChange={e => {
                          this.onChangeQuantity5(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

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

              <div className="col text-center typeOfPurchase">
                <div className="text-center">
                  <h2>Type of purchase{"  "}</h2>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="type"
                    id="onlinePurchaseYes"
                    value="store"
                  />
                  <label class="form-check-label" for="onlinePurchaseYes">
                    Store
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="type"
                    id="onlinePurchaseNo"
                    value="online"
                  />
                  <label class="form-check-label" for="onlinePurchaseNo">
                    Online
                  </label>
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
                        {customers.map(c => (
                          <option value={c._id}>{c.firstName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading</p>
              )}

              <div className="salesSubmitButton">
                <button
                  className="btn btn-default btn-lg btn-block info salesButton2"
                  onClick={e => {
                    e.preventDefault();
                    this.goBack();
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary btn-lg btn-block info salesButton2">
                  Create
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
