import React, { Component, Fragment } from "react";
import "./css/App.css";
import "./css/Customer.css";
import "./css/DeleteCustomer.css";
import "./css/CurrencyConverter.css";
import "./css/Weather.css";
import "./css/ProductForm.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import CustomerList from "./components/CustomerList";
import EditProductForm from "./components/EditProductForm";
import SalesForm from "./components/SalesForm";
import PrimaryNav from "./components/PrimaryNav";
import SideBar from "./components/SideBar";
import LinkButton from "./components/LinkButton";
import Customer from "./components/Customer";
import CustomerForm from "./components/CustomerForm";
import EditCustomerForm from "./components/EditCustomerForm";
import DeleteCustomer from "./components/DeleteCustomer";
import CurrencyConverter from "./components/CurrencyConverter";
import Weather from "./components/Weather";
import NotificationList from "./components/NotificationList";
import DailyReport from "./components/DailyReport";
import WeeklyReport from "./components/WeeklyReport";

import Error from "./components/Error";
import { signIn, signUp, signOutNow } from "./api/auth";
import { getDecodedToken } from "./api/token";
import { listProducts, createProduct, updateProduct } from "./api/products";
import { listCustomers, createCustomer, updateCustomer } from "./api/customers";
import { dailySales, monthRangeSales } from "./api/sales";

import {
  dailyCustomerTraffics,
  listCustomerTraffics,
  createCustomerTraffics,
  updateCustomerTraffic
} from "./api/customerTraffics";

import {
  listNotifications,
  updateNotifications,
  deleteNotifications
} from "./api/notifications";
import { fetchWeather } from "./api/weather";
import moment from "moment";

class App extends Component {
  state = {
    error: null,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null,
    customers: null,
    editedProductID: null,
    productPrice: null,
    weather: null,
    notifications: null,
    date: moment(),
    dailySales: null,
    monthRangeSales: null,
    dailyCustomerTraffics: null,
    customerTraffics: null,
    pieChartChefData: null,
    pieChartOriginData: null
  };

  getPieChartChefData = () => {
    const chartData = this.getDataCustomerPieChart(this.state.customerTraffics);
    this.setState({
      pieChartChefData: {
        labels: ["Chef", "Non Chef", "Unknown"],
        datasets: [
          {
            backgroundColor: ["#2ecc71", "#e74c3c", "rgb(111, 107, 117)"],
            data: chartData
          }
        ]
      }
    });
  };

  getPieChartOriginData = () => {
    const chartData = this.getDataCustomerOriginPieChart(
      this.state.customerTraffics
    );
    this.setState({
      pieChartOriginData: {
        labels: [
          "Facebook",
          "Online search",
          "Referral",
          "Newspaper",
          "Walk in",
          "QT Hotel Guest",
          "Return",
          "unknown"
        ],
        datasets: [
          {
            backgroundColor: [
              "#2ecc71",
              "#e74c3c",
              "rgb(111, 107, 117)",
              "rgb(23, 214, 240)",
              "rgb(176, 210, 19)",
              "rgb(209, 47, 215)",
              "rgb(238, 69, 23)",
              "rgb(70, 0, 249)"
            ],
            data: chartData
          }
        ]
      }
    });
  };

  // create array data for chef nonchef pie chart
  getDataCustomerPieChart = customersData => {
    let CustomerPieChart = []; //[chef,nonChef,unknown]

    let total = customersData
      .map(customerData => {
        return customerData.number;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    let chef = this.detectChef("true", customersData);

    let nonChef = this.detectChef("false", customersData);

    let unknown = total - chef - nonChef;

    CustomerPieChart.push(chef, nonChef, unknown);
    return CustomerPieChart;
  };

  detectChef = (type, data) => {
    return data
      .map(customerData => {
        if (customerData.isChef === type) {
          return customerData.number;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
  };

  detectOrigin = (type, data) => {
    return data
      .map(customerData => {
        if (customerData.origin === type) {
          return customerData.number;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
  };

  // create array data for chef origin pie chart
  getDataCustomerOriginPieChart = customersData => {
    let CustomerOriginPieChart = []; //[chef,nonChef,unknown]

    let faceBook = this.detectOrigin("Facebook", customersData);

    let onlineSearch = this.detectOrigin("OnlineSearch", customersData);

    let referral = this.detectOrigin("Referral", customersData);

    let newspaper = this.detectOrigin("Newspaper", customersData);

    let walkIn = this.detectOrigin("WalkIn", customersData);

    let hotelGuest = this.detectOrigin("HotelGuest", customersData);

    let returnCustomer = this.detectOrigin("Return", customersData);

    let unknown = this.detectOrigin("Unknown", customersData);

    CustomerOriginPieChart.push(
      faceBook,
      onlineSearch,
      referral,
      newspaper,
      walkIn,
      hotelGuest,
      returnCustomer,
      unknown
    );

    return CustomerOriginPieChart;
  };

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
  //for date picker
  onDate = event => {
    this.setState({ date: event });
    dailySales(event.format("YYYY-MM-DD")).then(dailySales => {
      this.setState({ dailySales });
    });
    dailyCustomerTraffics(event.format("YYYY-MM-DD")).then(
      dailyCustomerTraffics => {
        this.setState({ dailyCustomerTraffics });
      }
    );
  };

  render() {
    const {
      error,
      decodedToken,
      products,
      customers,
      editedProductID,
      wishlist,
      weather,
      productPrice,
      notifications,
      date,
      dailySales,
      monthRangeSales,
      dailyCustomerTraffics,
      customerTraffics,
      pieChartChefData,
      pieChartOriginData
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

              <Switch>
                <Route
                  path="/"
                  exact
                  render={requireAuth(() => (
                    <Fragment>
                      {!!weather ? (
                        <Weather
                          temperature={weather.temp}
                          date={weather.date}
                          forecast={weather.weather.description}
                          icon={weather.weather.icon}
                        />
                      ) : (
                        <p>Loading</p>
                      )}

                      <CurrencyConverter />
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
                      {products && (
                        <ProductList
                          products={products}
                          editedProductID={editedProductID}
                          onEditProduct={this.onBeginEditingProduct}
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
                      )}
                      <LinkButton href="/admin/products" name="product" />
                    </Fragment>
                  ))}
                />

                <Route
                  path="/admin/products"
                  exact
                  render={requireAuth(() => (
                    <Fragment>
                      {signedIn && (
                        <div className="mb-3">
                          <h2>Create Product</h2>
                          <ProductForm
                            submitTitle="Create Product"
                            onSubmit={this.onCreateProduct}
                          />
                        </div>
                      )}
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
                  path="/report-daily"
                  exact
                  render={requireAuth(() => (
                    <div>
                      <DailyReport
                        startDate={date}
                        dailySales={dailySales}
                        dailyCustomerTraffics={dailyCustomerTraffics}
                        onClick={this.onDate}
                      />
                    </div>
                  ))}
                />

                <Route
                  path="/report-weekly"
                  exact
                  render={requireAuth(() => (
                    <div>
                      <WeeklyReport
                        monthRangeSales={monthRangeSales}
                        customerTraffics={customerTraffics}
                        pieChartChefData={pieChartChefData}
                        pieChartOriginData={pieChartOriginData}
                      />
                    </div>
                  ))}
                />

                <Route
                  path="/report-monthly"
                  exact
                  render={requireAuth(() => <div />)}
                />

                <Route
                  path="/sales"
                  exact
                  render={requireAuth(() => (
                    <Fragment>
                      {customers && (
                        <CustomerList customers={customers} />
                        // <div>yay</div>
                      )}
                      <LinkButton href="/admin/customers" name="customers" />
                    </Fragment>
                  ))}
                />

                <Route
                  path="/customers"
                  exact
                  render={requireAuth(() => (
                    <Fragment>
                      {customers && (
                        <CustomerList customers={customers} />
                        // <div>yay</div>
                      )}
                      <LinkButton href="/admin/customers" name="customers" />
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
                    <h2>🙇Page not found: {location.pathname}</h2>
                  )}
                />
              </Switch>

              {/* <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3"> */}
              {/* </main> */}
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

    listNotifications()
      .then(notifications => {
        this.setState({ notifications });
      })
      .catch(saveError);

    dailySales(this.state.date.format("YYYY-MM-DD"))
      .then(dailySales => {
        this.setState({ dailySales });
      })
      .catch(saveError);

    dailyCustomerTraffics(this.state.date.format("YYYY-MM-DD"))
      .then(dailyCustomerTraffics => {
        this.setState({ dailyCustomerTraffics });
      })
      .catch(saveError);

    monthRangeSales(3)
      .then(monthRangeSales => {
        this.setState({ monthRangeSales });
      })
      .catch(saveError);

    listCustomerTraffics()
      .then(customerTraffics => {
        this.setState({ customerTraffics });
        this.getPieChartChefData();
        this.getPieChartOriginData();
      })
      .catch(saveError);

    fetchWeather()
      .then(weather => {
        this.setState({ weather: weather });
      })
      .catch(error => {
        this.setState({ error: error });
        console.log("Error loading weather conversion", error);
      });

    const { decodedToken } = this.state;
    const signedIn = !!decodedToken;

    if (signedIn) {
      // Load only for signed in users
    } else {
      // Clear sign-in-only data
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    this.load();
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
