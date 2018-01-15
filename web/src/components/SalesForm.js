import React, { Component } from "react";
import CustomerFormNew from "./CustomerFormNew";
import CustomerFormReturn from "./CustomerFormReturn";
import { listProducts } from "../api/products";
import { listSales, createSales, deleteSales } from "../api/sales";

class SalesForm extends Component {
  state = {
    products: null,
    saleItems: 1,
    value: [],
    customer: true,
    productPrice1: null,
    productPrice2: null,
    productPrice3: null
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

  showhide(target) {}

  onChangeTitle1 = (number, title) => {
    const { products } = this.state;
    const key = `productPrice${number}`;
    const chosenProduct = products.filter(product => {
      return product.title === title;
    })[0];
    this.setState({ productPrice1: chosenProduct.price });
  };
  onChangeTitle2 = (number, title) => {
    const { products } = this.state;
    const key = `productPrice${number}`;
    const chosenProduct = products.filter(product => {
      return product.title === title;
    })[0];
    this.setState({ productPrice2: chosenProduct.price });
  };
  onChangeTitle3 = (number, title) => {
    const { products } = this.state;
    const key = `productPrice${number}`;
    const chosenProduct = products.filter(product => {
      return product.title === title;
    })[0];
    this.setState({ productPrice3: chosenProduct.price });
  };
  onChangeTitle4 = (number, title) => {
    const { products } = this.state;
    const key = `productPrice${number}`;
    const chosenProduct = products.filter(product => {
      return product.title === title;
    })[0];
    this.setState({ productPrice4: chosenProduct.price });
  };
  onChangeTitle5 = (number, title) => {
    const { products } = this.state;
    const key = `productPrice${number}`;
    const chosenProduct = products.filter(product => {
      return product.title === title;
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

  // displayItems() {
  //   let forms = [];
  //   for (let i = 0; i < this.state.saleItems; i++) {
  //     forms.push(
  //       <div key={i}>
  //         <SalesItem
  //           products={this.state.products}
  //           productPrice={this.state.productPrice}
  //           onChangeTitle={this.onChangeTitle}
  //           onChangePrice={this.onChangePrice}
  //           value={this.state.value[i] || ""}
  //         />
  //       </div>
  //     );
  //   }
  //   return forms || null;
  // }

  customerType() {
    this.setState({
      customer: !this.state.customer
    });
  }

  onCreateSale = saleData => {
    createSales(saleData).then(newSale =>
      this.setState(prevState => {
        const updatedSales = prevState.products.concat(newSale);
        sales: updatedSales;
      })
    );
  };

  render() {
    const {
      products,
      saleItems,
      customer,
      productPrice1,
      productPrice2
    } = this.state;

    return (
      <div className="col salesForm">
        <h1 className="salesFormHeading text-center mb-5">New sales</h1>
        {products && (
          <form
            className=""
            onSubmit={event => {
              // Prevent old-school form submission
              event.preventDefault();

              const form = event.target;
              const elements = form.elements; // Allows looking up fields using their 'name' attributes
              // Get entered values from fields
              const brandName = elements.brandName.value;
              const name = elements.name.value;

              // Pass this information along to the parent component
              this.onCreateSale({ brandName, name });
            }}
          >
            <fieldset>
              <div className="form-group text-center">
                <div className="col">
                  <label className="control-label mr-3">Date</label>
                  <i className="fa fa-calendar mr-1" />
                  <input type="date" />
                </div>
              </div>
              {/* {this.displayItems()} */}
              {/* First Sale Item */}
              <div className="col" id="saleitem1">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="brandName"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle1(1, e.target.value);
                      }}
                    >
                      {products.map(m => (
                        <option value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {console.log(this.state)}
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="mobile"
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
                      <input type="number" className="form-control" min="1" />
                    </div>
                  </div>
                </div>
                {/* <button
                  onClick={e => {
                    e.preventDefault();
                    this.showhide("hide");
                  }}
                >
                  click
                </button> */}
              </div>

              {/* Second Sale Item */}
              <div className="col salesItem test hide">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="brandName"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle2(2, e.target.value);
                      }}
                    >
                      {products.map(m => (
                        <option value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="mobile"
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
                      <input type="number" className="form-control" min="1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Sale Item */}
              <div className="col salesItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="brandName"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle3(3, e.target.value);
                      }}
                    >
                      {products.map(m => (
                        <option value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {console.log(this.state)}
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="mobile"
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
                      <input type="number" className="form-control" min="1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fourth Sale Item */}
              <div className="col salesItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="brandName"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle4(4, e.target.value);
                      }}
                    >
                      {products.map(m => (
                        <option value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {console.log(this.state)}
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="mobile"
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
                      <input type="number" className="form-control" min="1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fifth Sale Item */}
              <div className="col salesItem">
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Product</label>
                    <select
                      name="brandName"
                      className="form-control"
                      onChange={e => {
                        this.onChangeTitle5(5, e.target.value);
                      }}
                    >
                      {products.map(m => (
                        <option value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {console.log(this.state)}
                <div className="form-group">
                  <div className="col">
                    <label className="control-label">Price</label>
                    <div className="input-group">
                      <input
                        name="mobile"
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
                      <input type="number" className="form-control" min="1" />
                    </div>
                  </div>
                </div>
              </div>

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

              <div className="salePrice">
                <h2>Total:</h2>
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
