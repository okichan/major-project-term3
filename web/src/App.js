import React, { Component, Fragment } from "react";
import "./css/App.css";
import "./css/SalesForm.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import ProductForm from "./components/ProductForm";
import CustomerList from "./components/CustomerList";
import SaleList from "./components/SaleList";
import SalesFormV2 from "./components/SalesFormV2";

import SalesForm from "./components/SalesForm";
import PrimaryNav from "./components/PrimaryNav";
import SideBar from "./components/SideBar";
import LinkButton from "./components/LinkButton";
import CustomerForm from "./components/CustomerForm";
import Home from "./components/Home";
import CustomerTraffic from "./components/CustomerTraffic";
import NotificationList from "./components/NotificationList";
import DailyReport from "./components/DailyReport";
import WeeklyReport from "./components/WeeklyReport";

import Error from "./components/Error";
import { signIn, signUp, signOutNow } from "./api/auth";
import { getDecodedToken } from "./api/token";
import {
  listSales,
  createSale,
  deleteSale,
  updateSale,
  dailySales,
  monthRangeSales
} from "./api/sales";

import {
  dailyCustomerTraffics,
  listCustomerTraffics,
  createCustomerTraffics,
  updateCustomerTraffic,
  deleteCustomerTraffics
} from "./api/customerTraffics";

import {
  listProducts,
  listFilteredProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./api/products";
import {
  listCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "./api/customers";
import {
  listNotifications,
  updateNotifications,
  deleteNotifications
} from "./api/notifications";
import axios from "axios";
import moment from "moment";

class App extends Component {
  state = {
    error: null,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null,
    filteredProducts: null,
    sales: null,
    customers: null,
    productPrice: null,
    notifications: null,
    date: moment(),
    dailySales: null,
    monthRangeSales: null,
    dailyCustomerTraffics: null,
    customerTraffics: null,
    pieChartChefData: null,
    pieChartOriginData: null,
    weekRangeChef: 10,
    weekRangeOrigin: 10,
    weekRangeKnife: 10,
    weekRangeSharp: 10,
    chosenImage: null
  };

  // for image uploading
  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "drfrsbsl"); // Replace the preset name with your own
      formData.append("api_key", "921677816388229"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dbbim9cy0/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          this.setState({ chosenImage: fileURL });
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
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
              "rgb(231, 126, 55)",
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
        window.location.href = "/products";
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
    deleteProduct(id)
      .then(product => {
        this.load();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onEditProduct = data => {
    updateProduct(data._id, data)
      .then(updatedProduct => {
        window.location.href = "/products";
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
            products: updatedProducts
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onProductFilter = query => {
    const matchProducts = this.state.products.filter(product => {
      return product.category === query;
    });
    if (query !== "") {
      this.setState({ filteredProducts: matchProducts });
    } else {
      this.setState({ filteredProducts: this.state.products });
    }
  };

  onCreateCustomer = customerData => {
    createCustomer(customerData)
      .then(newCustomer => {
        window.location.href = "/customers";
        this.setState(prevState => {
          // Append to existing customers array
          const updatedCustomers = prevState.customers.concat(newCustomer);
          return {
            customers: updatedCustomers
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onDeleteCustomer = id => {
    deleteCustomer(id)
      .then(customer => {
        this.load();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onEditCustomer = data => {
    updateCustomer(data._id, data)
      .then(updatedCustomer => {
        window.location.href = "/customers";
        this.setState(prevState => {
          // Replace in existing customers array
          const updatedCustomer = prevState.customers.map(customer => {
            if (customer._id === updatedCustomer._id) {
              return updatedCustomer;
            } else {
              return customer;
            }
          });
          return {
            customers: updatedCustomer
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  findProduct = id => {
    const { products } = this.state;
    var selectedProduct = products.filter(product => {
      return product._id === id;
    })[0];
    return selectedProduct;
  };

  onDeleteSale = id => {
    deleteSale(id)
      .then(sale => {
        this.load();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onEditSale = data => {
    updateSale(data._id, data)
      .then(updatedSale => {
        window.location.href = "/sales";
        this.setState(prevState => {
          // Replace in existing products array
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

  onChageRange = (type, range) => {
    this.setState({ ["weekRange" + type]: range });
  };

  // create customer Traffics
  onCreateCustomerTraffics = data => {
    createCustomerTraffics(data).then(newCustomerTraffic => {
      this.setState(prevState => {
        // Append to existing products array
        const updatedProducts = prevState.customerTraffics.concat(
          newCustomerTraffic
        );
        return {
          customerTraffics: updatedProducts
        };
      });
      this.getPieChartChefData();
      this.getPieChartOriginData();
      dailySales(this.state.date.format("YYYY-MM-DD"))
        .then(dailySales => {
          this.setState({ dailySales });
        })
        .catch(error => {
          console.error(error.message);
        });

      dailyCustomerTraffics(this.state.date.format("YYYY-MM-DD"))
        .then(dailyCustomerTraffics => {
          this.setState({ dailyCustomerTraffics });
        })
        .catch(error => {
          console.error(error.message);
        });
      alert("Add new customer traffic");
    });
  };

  onDeleteCustomerTraffic = id => {
    deleteCustomerTraffics(id)
      .then(traffic => {
        this.load();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onEditTraffic = data => {
    updateCustomerTraffic(data._id, data)
      .then(updatedTraffic => {
        window.location.href = "/traffic";
        this.setState(prevState => {
          // Replace in existing products array
          const updatedTraffic = prevState.traffics.map(traffic => {
            if (traffic._id === updatedTraffic._id) {
              return updatedTraffic;
            } else {
              return traffic;
            }
          });
          return {
            traffics: updatedTraffic
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onImageReset = () => {
    this.setState({ chosenImage: null });
  };

  multiplyNumbers(numberOne, numberTwo) {
    return numberOne * numberTwo;
  }

  capitalizeWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  render() {
    const {
      error,
      decodedToken,
      products,
      filteredProducts,
      sales,
      customers,
      traffics,
      productPrice,
      notifications,
      date,
      dailySales,
      monthRangeSales,
      dailyCustomerTraffics,
      customerTraffics,
      pieChartChefData,
      pieChartOriginData,
      weekRangeChef,
      weekRangeOrigin,
      weekRangeKnife,
      weekRangeSharp,
      chosenImage
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
                currentUser={this.state.decodedToken}
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
                        <Home
                          onCreateCustomerTraffics={
                            this.onCreateCustomerTraffics
                          }
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/notifications"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        {signedIn && (
                          <NotificationList
                            notifications={notifications}
                            onClickDelete={this.onClickDelete}
                            onClickToggle={this.onClickToggoleCheckedField}
                          />
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
                        <h2 className="text-center mb-4">Products</h2>
                        <ProductFilter prodCategory={this.onProductFilter} />
                        <ProductList
                          filteredProducts={filteredProducts}
                          onEditedProductSubmit={this.onEditProduct}
                          deleteProduct={this.onDeleteProduct}
                          chosenImage={chosenImage}
                          onDrop={this.handleDrop}
                          onImageReset={this.onImageReset}
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
                          chosenImage={chosenImage}
                          onDrop={this.handleDrop}
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/new-sales"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <h1 className="text-center my-4">New sales</h1>
                        <SalesFormV2 />
                        {/* <SalesForm
													products={products}
													productPrice={productPrice}
													onChangeTitle={this.onChangeTitle}
													onChangePrice={this.onChangePrice}
												/> */}
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/traffic"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        {!!customerTraffics ? (
                          <CustomerTraffic
                            traffic={customerTraffics}
                            deleteTraffic={this.onDeleteCustomerTraffic}
                            updateTraffic={this.onEditTraffic}
                          />
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
                          weekRangeChef={weekRangeChef}
                          weekRangeOrigin={weekRangeOrigin}
                          weekRangeKnife={weekRangeKnife}
                          weekRangeSharp={weekRangeSharp}
                          onChageRange={this.onChageRange}
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
                        <LinkButton href="/new-sales" name="sale" />
                        <SaleList
                          multiplyNumbers={this.multiplyNumbers}
                          capitalizeWord={this.capitalizeWord}
                          sortByDate={this.sortByKey}
                          sales={sales}
                          deleteSale={this.onDeleteSale}
                          editSale={this.onEditSale}
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/customers"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <LinkButton href="/admin/customers" name="customer" />
                        <CustomerList
                          products={products}
                          customers={customers}
                          deleteCustomer={this.onDeleteCustomer}
                          editCustomer={this.onEditCustomer}
                          findProduct={this.findProduct}
                          sortByKey={this.sortByKey}
                          multiplyNumbers={this.multiplyNumbers}
                        />
                      </Fragment>
                    ))}
                  />

                  <Route
                    path="/admin/customers"
                    exact
                    render={requireAuth(() => (
                      <Fragment>
                        <CustomerForm
                          customers={customers}
                          submitTitle="Create Customer"
                          onSubmit={this.onCreateCustomer}
                        />
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
        this.setState({ products, filteredProducts: products });
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

    // default a half year
    monthRangeSales(6)
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
    if (this.state.error !== null) {
      // reset error
      setTimeout(() => {
        this.setState({ error: null });
      }, 4000);
    }
    // If just signed in, signed up, or signed out,
    // then the token will have changed

    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load();
    }
  }
}

export default App;
