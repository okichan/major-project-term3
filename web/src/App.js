import React, { Component, Fragment } from "react";
import "./css/App.css";
import "./css/Customer.css";
import "./css/DeleteCustomer.css";
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
import SalesForm from "./components/SalesForm";
import Wishlist from "./components/Wishlist";
import PrimaryNav from "./components/PrimaryNav";
import SideBar from "./components/SideBar";
import LinkButton from "./components/LinkButton";
import Customer from "./components/Customer";
import CustomerForm from "./components/CustomerForm";
import EditCustomerForm from "./components/EditCustomerForm";
import DeleteCustomer from "./components/DeleteCustomer";

import Error from "./components/Error";
import { signIn, signUp, signOutNow } from "./api/auth";
import { getDecodedToken } from "./api/token";
import { listProducts, createProduct, updateProduct } from "./api/products";
import { listCustomers, createCustomer, updateCustomer } from "./api/customers";
import {
   listWishlist,
   addProductToWishlist,
   removeProductFromWishlist
} from "./api/wishlist";

class App extends Component {
   state = {
      error: null,
      decodedToken: getDecodedToken(), // Restore the previous signed in data
      products: null,
      customers: null,
      editedProductID: null,
      wishlist: null
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

   onSignUp = ({ email, password, firstName, lastName }) => {
      signUp({ email, password, firstName, lastName })
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

   onAddProductToWishlist = productID => {
      addProductToWishlist(productID)
         .then(wishlist => {
            this.setState({ wishlist });
         })
         .catch(error => {
            this.setState({ error });
         });
   };

   onRemoveProductFromWishlist = productID => {
      removeProductFromWishlist(productID)
         .then(wishlist => {
            this.setState({ wishlist });
         })
         .catch(error => {
            this.setState({ error });
         });
   };

   render() {
      const {
         error,
         decodedToken,
         products,
         customers,
         editedProductID,
         wishlist
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
                     <PrimaryNav signedIn={signedIn} signOut={this.onSignOut} />
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
                                 <Home />
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
                                       {new Date(
                                          decodedToken.iat * 1000
                                       ).toISOString()}
                                    </p>
                                    <p>
                                       Expire at:{" "}
                                       {new Date(
                                          decodedToken.exp * 1000
                                       ).toISOString()}
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
                                       productsInWishlist={
                                          !!wishlist ? wishlist.products : null
                                       }
                                       editedProductID={editedProductID}
                                       onEditProduct={
                                          this.onBeginEditingProduct
                                       }
                                       onAddProductToWishlist={
                                          this.onAddProductToWishlist
                                       }
                                       onRemoveProductFromWishlist={
                                          this.onRemoveProductFromWishlist
                                       }
                                       renderEditForm={product => (
                                          <div className="ml-3">
                                             <ProductForm
                                                initialProduct={product}
                                                submitTitle="Update Product"
                                                onSubmit={
                                                   this.onUpdateEditedProduct
                                                }
                                             />
                                          </div>
                                       )}
                                    />
                                 )}
                                 <LinkButton
                                    href="/admin/products"
                                    name="product"
                                 />
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
                           path="/wishlist"
                           exact
                           render={requireAuth(() => (
                              <Fragment>
                                 {wishlist && (
                                    <Wishlist
                                       products={wishlist.products}
                                       onRemoveProductFromWishlist={
                                          this.onRemoveProductFromWishlist
                                       }
                                    />
                                 )}
                              </Fragment>
                           ))}
                        />

                        <Route
                           path="/new-sales"
                           exact
                           render={requireAuth(() => (
                              <SalesForm products={products} />
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
                              <DeleteCustomer
                                 firstName={"John"}
                                 lastName={"Smith"}
                              />
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
                                 {customers && ( 
                                    <CustomerList customers={ customers } />
                                    // <div>yay</div>
                                 )}
                                 <LinkButton
                                    href="/admin/customers"
                                    name="customers"
                                 />
                              </Fragment>
                           ))}
                        />

                        <Route
                           path="/customers"
                           exact
                           render={requireAuth(() => (
                              <Fragment>
                                 {customers && ( 
                                    <CustomerList customers={ customers } />
                                    // <div>yay</div>
                                 )}
                                 <LinkButton
                                    href="/admin/customers"
                                    name="customers"
                                 />
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


      const { decodedToken } = this.state;
      const signedIn = !!decodedToken;

      if (signedIn) {
         // Load only for signed in users
         listWishlist()
            .then(wishlist => {
               this.setState({ wishlist });
            })
            .catch(saveError);
      } else {
         // Clear sign-in-only data
         this.setState({
            wishlist: null
         });
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
