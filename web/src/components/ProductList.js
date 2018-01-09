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

         <table className="table table-sm">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">RRP</th>
                  <th scope="col" colSpan="2"></th>
               </tr>
            </thead>

            {products.map(product => {
               return (
                  <Fragment key={product._id}>
                     <tbody>
                        <tr
                           className="header"
                           style={{ borderBottom: "2px solid transparent" }}
                        >
                           <td>{product.code}</td>

                           <td>
                              <a
                                 data-toggle="collapse"
                                 href={`#${product.code}`}
                                 role="button"
                                 aria-expanded="false"
                                 aria-controls="collapseExample"
                              >
                                 {product.title}
                              </a>
                           </td>
                           <td>${product.price}</td>
                           <td>
                              <a href={`/products/${product._id}`}>
                                 <i
                                    className="fa fa-pencil-square-o med"
                                    id="edit"
                                    title="Edit"
                                    />
                              </a>
                              </td>
                                    <td>
                              <i
                                 className="fa fa-trash med"
                                 id="trash"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                    alert("delete function here");
                                 }}
                                 title="Delete"
                                 />
                                 </td>
                        </tr>
                        <tr>
                           <td colSpan="5">
                              <div className="collapse" id={product.code}>
                                 <div className="card card-body">
                                    <div className="row">
                                       <div className="col-2">
                                          <p>Stock: {product.stock}</p>
                                       </div>
                                       <div className="col-3">
                                          <p>
                                             Total sales: {product.totalSales}
                                          </p>
                                          <p>
                                             Total Orders: {product.totalOrders}
                                          </p>
                                       </div>
                                       <div className="col-3">
                                          <p>Cost JPY: xxx</p>
                                          <p>Cost AUD: xxx</p>
                                       </div>
                                    </div>

                                    <img
                                       src="https://www.qthotelsandresorts.com/melbourne/wp-content/uploads/sites/9/2017/05/Jam-on-Your-Collar-Tanto-0098.jpg"
                                       style={{ width: "100%" }}
                                    />
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </Fragment>
               );
            })}
         </table>
      </div>
   );
}

export default ProductList;
