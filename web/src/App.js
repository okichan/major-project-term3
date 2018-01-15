import React, { Component, Fragment } from "react";
import "./css/App.css";
import "./css/Customer.css";
import "./css/DeleteCustomer.css";
// import "./css/ProductForm.css";
import "./css/CustomerTraffic.css";
import "./css/CustomerTrafficForm.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import CustomerList from "./components/CustomerList";
import SaleList from "./components/SaleList";

import EditProductForm from "./components/EditProductForm";
import SalesForm from "./components/SalesForm";
import PrimaryNav from "./components/PrimaryNav";
import SideBar from "./components/SideBar";
import LinkButton from "./components/LinkButton";
import Customer from "./components/Customer";
import CustomerForm from "./components/CustomerForm";
import EditCustomerForm from "./components/EditCustomerForm";
import DeleteCustomer from "./components/DeleteCustomer";
import Home from "./components/Home";
import CustomerTraffic from "./components/CustomerTraffic";
import NotificationList from "./components/NotificationList";
import Error from "./components/Error";
import { signIn, signUp, signOutNow } from "./api/auth";
import { getDecodedToken } from "./api/token";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./api/products";
import { listCustomers, createCustomer, updateCustomer } from "./api/customers";
import { listSales, createSale, updateSale } from "./api/sales";
import {
  listNotifications,
  updateNotifications,
  deleteNotifications
} from "./api/notifications";

listCustomers().then(res => {
  console.log("Loaded Customers", res);
});

class App extends Component {
  state = {
    error: null,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null,
    sales: null,
    customers: null,
    traffics: [
      {
        date: "01-01-2018",
        time: "10:55am",
        count: 2,
        isChef: "yes",
        weather: "sunny 27"
      },
      {
        date: "01-01-2018",
        time: "10:55am",
        count: 2,
        isChef: "yes",
        weather: "sunny 27"
      },
      {
        date: "01-01-2018",
        time: "10:55am",
        count: 2,
        isChef: "yes",
        weather: "sunny 27"
      },
      {
        date: "01-01-2018",
        time: "10:55am",
        count: 2,
        isChef: "yes",
        weather: "sunny 27"
      },
      {
        date: "01-01-2018",
        time: "10:55am",
        count: 2,
        isChef: "yes",
        weather: "sunny 27"
      }
    ],
    editedProductID: null,
    productPrice: null,
    notifications: null
  };

  componentDidMount() {
    this.load();
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then(decodedToken => {
        this.setState({ decodedToken });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onSignUp = ({ email, password, userName }) => {
    signUp({ email, password, userName })
      .then(decodedToken => {
        this.setState({ decodedToken });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onSignOut = () => {
    signOutNow();
    this.setState({ decodedToken: null });
  };

  onCreateProduct = productData => {
    createProduct(productData)
      .then(newProduct => {
        this.setState(prevState => {
          // Append to existing products array
          const updatedProducts = prevState.products.concat(newProduct);
          return {
            products: updatedProducts
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onDeleteProduct = id => {
    console.log(id);
    deleteProduct(id)
      .then(product => {
        this.load();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onBeginEditingProduct = newID => {
    this.setState({ editedProductID: newID });
  };

  onUpdateEditedProduct = productData => {
    const { editedProductID } = this.state;
    updateProduct(editedProductID, productData)
      .then(updatedProduct => {
        this.setState(prevState => {
          // Replace in existing products array
          const updatedProducts = prevState.products.map(product => {
            if (product._id === updatedProduct._id) {
              return updatedProduct;
            } else {
              return product;
            }
          });
          return {
            products: updatedProducts,
            editedProductID: null
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  // onChange function for saleForm.js select menu
  onChangeTitle = title => {
    const { products } = this.state;
    const chosenProdut = products.filter(product => {
      return product.title === title;
    })[0];
    this.setState({ productPrice: chosenProdut.price });
  };

  onChangePrice = e => {
    const value = e.target.value;
    this.setState({ productPrice: value });
  };

  onClickDelete = () => {
    deleteNotifications()
      .then(data => {
        this.load();
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  onClickToggoleCheckedField = (id, data) => {
    updateNotifications(id, data)
      .then(data => {
        this.load();
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  render() {
    const {
      error,
      decodedToken,
      products,
      sales,
      customers,
      editedProductID,
      traffics,
      productPrice,
      notifications
    } = this.state;
    const signedIn = !!decodedToken;

    const requireAuth = render => props =>
      !signedIn ? <Redirect to="/signin" /> : render(props);

    return (
      <Router>
        <div className="App">
          {error && <Error error={error} />}
          {signedIn && (
            <header>
              <PrimaryNav
                signedIn={signedIn}
                signOut={this.onSignOut}
                notificationCount={notifications ? notifications.length : "0"}
              />
            </header>
          )}

          <div className="container-fluid">
            <div className="row">
              {signedIn && <SideBar signedIn={signedIn} />}

              <div className="col">
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <Home />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/notifications"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        {signedIn && (
                          <div className="mb-3">
                            <h2>Notification list</h2>
                            <NotificationList
                              notifications={notifications}
                              onClickDelete={this.onClickDelete}
                              onClickToggle={this.onClickToggoleCheckedField}
                            />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/signin"
                    exact
                    render={({ match }) =>
                      signedIn ? (
                        <Redirect to="/" />
                      ) : (
                        <Fragment>
                          <SignInForm onSignIn={this.onSignIn} />
                        </Fragment>
                      )
                    }
                  />

                  <Route
                    path="/signup"
                    exact
                    render={() =>
                      signedIn ? (
                        <Redirect to="/" />
                      ) : (
                        <Fragment>
                          <SignUpForm onSignUp={this.onSignUp} />
                        </Fragment>
                      )
                    }
                  />

                  <Route
                    path="/account"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <div className="mb-3">
                          <p>Email: {decodedToken.email}</p>
                          <p>
                            Signed in at:{" "}
                            {new Date(decodedToken.iat * 1000).toISOString()}
                          </p>
                          <p>
                            Expire at:{" "}
                            {new Date(decodedToken.exp * 1000).toISOString()}
                          </p>
                        </div>
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/products"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <LinkButton href="/admin/products" name="product" />
                        <ProductList
                          products={products}
                          editedProductID={editedProductID}
                          onEditProduct={this.onBeginEditingProduct}
                          deleteProduct={this.onDeleteProduct}
                          renderEditForm={product => (
                            <div className="ml-3">
                              <ProductForm
                                initialProduct={product}
                                submitTitle="Update Product"
                                onSubmit={this.onUpdateEditedProduct}
                              />
                            </div>
                          )}
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/admin/products"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <ProductForm
                          products={products}
                          submitTitle="Create Product"
                          onSubmit={this.onCreateProduct}
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/edit-product"
                    exact
                    render={requireAuth(() => <EditProductForm />)}
                  />

                  <Route
                    path="/new-sales"
                    exact
                    render={requireAuth(() => (
                      <SalesForm
                        products={products}
                        productPrice={productPrice}
                        onChangeTitle={this.onChangeTitle}
                        onChangePrice={this.onChangePrice}
                      />
                    ))}
                  />

                  <Route
                    path="/customer"
                    exact
                    render={requireAuth(() => (
                      <Customer
                        firstName={"John"}
                        lastName={"Smith"}
                        sex={"male"}
                        email={"johnsmith@gmail.com"}
                        phone={"000"}
                        date={"01/01/2015"}
                        chef={"yes"}
                        customerOrigin={"McDonalds"}
                        notes={"i hate this guy"}
                      />
                    ))}
                  />

                  <Route
                    path="/new-customer"
                    exact
                    render={requireAuth(() => <CustomerForm />)}
                  />

                  <Route
                    path="/edit-customer"
                    exact
                    render={requireAuth(() => <EditCustomerForm />)}
                  />

                  <Route
                    path="/delete-customer"
                    exact
                    render={requireAuth(() => (
                      <DeleteCustomer firstName={"John"} lastName={"Smith"} />
                    ))}
                  />

                  <Route
                    path="/customertraffic"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        {!!traffics ? (
                          <CustomerTraffic traffics={traffics} />
                        ) : (
                          <p>Loading</p>
                        )}
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/report-daily"
                    exact
                    render={requireAuth(() => (
                      <div>
                        <h1>Daily report</h1>
                      </div>
                    ))}
                  />

                  <Route
                    path="/report-weekly"
                    exact
                    render={requireAuth(() => (
                      <div>
                        <h1>Weekly report</h1>
                      </div>
                    ))}
                  />

                  <Route
                    path="/report-monthly"
                    exact
                    render={requireAuth(() => (
                      <div>
                        <h1>Monthly report</h1>
                      </div>
                    ))}
                  />

                  <Route
                    path="/sales"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <LinkButton href="/new-sales" name="sale" />
                        <SaleList sales={sales} />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/customers"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <LinkButton href="/admin/customers" name="customer" />
                        {customers && (
                          <CustomerList customers={customers} />
                          // <div>yay</div>
                        )}
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/admin/customers"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        {signedIn && (
                          <div className="mb-3">
                            <h2>Create Customer</h2>
                            <ProductForm
                              submitTitle="Create Customer"
                              onSubmit={this.onCreateProduct}
                            />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  />

                  <Route
                    render={({ location }) => (
                      <h2>Page not found: {location.pathname}</h2>
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  load() {
    const saveError = error => {
      this.setState({ error });
    };

    // Load for everyone
    listProducts()
      .then(products => {
        this.setState({ products });
      })
      .catch(saveError);

    listCustomers()
      .then(customers => {
        this.setState({ customers });
      })
      .catch(saveError);

    listSales()
      .then(sales => {
        this.setState({ sales });
      })
      .catch(saveError);

    listNotifications()
      .then(notifications => {
        this.setState({ notifications });
      })
      .catch(saveError);

    const { decodedToken } = this.state;
    const signedIn = !!decodedToken;

    if (signedIn) {
      // Load only for signed in users
    } else {
      // Clear sign-in-only data
    }
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load();
    }
  }
}

export default App;
