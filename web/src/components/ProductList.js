import React, { Fragment } from "react";
import Product from "./Product";

// All this function does it determine whether the 'add to wishlist' and 'remove from wishlist' buttons should be shown
function statusForWishlist(product, productsInWishlist) {
   const hasWishlist = !!productsInWishlist;

   // Does not have wishlist
   if (!hasWishlist) {
      return { showAdd: false, showRemove: false };
   }

   // Has wishlist
   const inWishlist = productsInWishlist.some(productInWishlist => {
      // Found a matching product
      // i.e. this `product` is in the wishlist
      return productInWishlist._id === product._id;
   });

   return { showAdd: !inWishlist, showRemove: inWishlist };
}

function ProductList({
   products,
   productsInWishlist,
   editedProductID,
   onEditProduct,
   onAddProductToWishlist,
   onRemoveProductFromWishlist,
   renderEditForm
}) {
   const hasWishlist = !!productsInWishlist;

   return (
      <div className="col">
         <h2 className=" text-center mb-3 mt-3">Products</h2>

         <table className="table table-border">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">RRP</th>
                  <th scope="col" colSpan="2" />
               </tr>
            </thead>

            {products.map(product => {
               return (
                  <Fragment key={product._id}>
                     <tbody>
                        <tr className="header">
                           <td>{product.code}</td>
                           <td>{product.title}</td>
                           <td>${product.price}</td>
                           <td>
                              <button
                                 className="btn btn-sm btn-secondary"
                                 type="button"
                                 data-toggle="collapse"
                                 data-target={`#${product._id}`}
                                 aria-expanded="false"
                                 aria-controls="collapseExample"
                              >
                                 <i className="fa fa-caret-down" />
                              </button>
                           </td>
                        </tr>
                        <div className="collapse" id={product._id}>
                           <div className="card card-body">
                              {/* <tr> */}
                                 {/* <td colSpan="5"> */}
                                    <p>Stock: {product.stock}</p>
                                    <p>Cost JPY: xxx</p>
                                    <p>Cost AUD: xxx</p>
                                 {/* </td> */}
                              {/* </tr> */}
                           </div>
                        </div>
                     </tbody>
                  </Fragment>
               );
            })}
         </table>
      </div>
   );
}

export default ProductList;
