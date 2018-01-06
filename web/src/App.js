import React, { Component, Fragment } from "react";
import "./App.css";
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
import Wishlist from "./components/Wishlist";
import PrimaryNav from "./components/PrimaryNav";
import SideBar from "./components/SideBar";
import Error from "./components/Error";
import { signIn, signUp, signOutNow } from "./api/auth";
import { getDecodedToken } from "./api/token";
import { listProducts, createProduct, updateProduct } from "./api/products";
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
         editedProductID,
         wishlist
      } = this.state;
      const signedIn = !!decodedToken;

      const requireAuth = render => props =>
         !signedIn ? <Redirect to="/" /> : render(props);

      return (
         <Router>
            <div className="App">
               <header>
                  <PrimaryNav signedIn={signedIn} />
               </header>

               <div className="container-fluid">
                  <div className="row">
                     <SideBar signedIn={signedIn} />

                     <main
                        role="main"
                        className="col-sm-9 ml-sm-auto col-md-10 pt-3"
                     >
                           {error && <Error error={error} />}
                        <Switch>
                           {/* <Route
                              path="/"
                              exact
                              render={() => (
                                 <Fragment>
                                    <h1>Yarra</h1>
                                    <h2 className="mb-3">
                                       Now Delivering: Shipping trillions of new
                                       products
                                    </h2>
                                 </Fragment>
                              )}
                           /> */}

                           <Route
                              path="/"
                              exact
                              render={({ match }) =>
                                 signedIn ? (
                                    <Redirect to="/products" />
                                 ) : (
                                    <Fragment>
                                       <h5>Tanto Sales Management System</h5>
                                       <h2>Sign In</h2>
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
                                    <Redirect to="/products" />
                                 ) : (
                                    <Fragment>
                                       <h2>Sign Up</h2>
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
                                       <button onClick={this.onSignOut}>
                                          Sign Out
                                       </button>
                                    </div>
                                 </Fragment>
                              ))}
                           />

                           <Route
                              path="/products"
                              exact
                              render={() => (
                                 <Fragment>
                                    {products && (
                                       <ProductList
                                          products={products}
                                          productsInWishlist={
                                             !!wishlist
                                                ? wishlist.products
                                                : null
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
                                 </Fragment>
                              )}
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
                              path="/report-1"
                              exact
                              render={() => (
                                 <div>
                                    <img
                                       src="https://i1.wp.com/familylocket.com/wp-content/uploads/2016/01/pie-slice.png"
                                       width="200"
                                    />
                                 </div>
                              )}
                           />

                           <Route
                              path="/new-sales"
                              exact
                              render={() => (
                                 <div>
                                    <img
                                       src="https://i1.wp.com/familylocket.com/wp-content/uploads/2016/01/pie-slice.png"
                                       width="200"
                                    />
                                 </div>
                              )}
                           />

                           <Route
                              render={({ location }) => (
                                 <h2>Page not found: {location.pathname}</h2>
                              )}
                           />
                        </Switch>
                     </main>
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
