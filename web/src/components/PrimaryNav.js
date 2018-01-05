import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

function PrimaryNav({ signedIn }) {
   return (
      <nav
         className="navbar navbar-expand-sm navbar-light"
         style={{ background: "#E5E5E5" }}
      >
         <Link to="/">
            {" "}
            <img src={logo} style={{ width: "140px" }} />
         </Link>

         <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
         >
            <span className="navbar-toggler-icon" />
         </button>

         <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
               <li className="nav-item">
                  <Link to="/" className="nav-link">
                     Home
                  </Link>
               </li>
               <li className="nav-item">
                  <Link to="/products" className="nav-link">
                     Products
                  </Link>
               </li>
               {signedIn ? (
                  <Fragment>
                     <li className="nav-item">
                        <Link to="/wishlist" className="nav-link">
                           Wishlist
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/account" className="nav-link">
                           Account
                        </Link>
                     </li>
                  </Fragment>
               ) : (
                  <Fragment>
                     <li className="nav-item">
                        <Link to="/signin" className="nav-link">
                           Sign In
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                           Sign Up
                        </Link>
                     </li>
                  </Fragment>
               )}
            </ul>
         </div>
      </nav>
   );
}

export default PrimaryNav;
