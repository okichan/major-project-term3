import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import notification from "../assets/img/notification.svg";

function PrimaryNav({ signedIn }) {
   return (
      
      <nav
         className="navbar navbar-expand-sm navbar-light"
         style={{ background: "#E5E5E5"}}
      >
         <Link to="/" className="mr-3">
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
            <div className="ml-auto">
               <ul className="nav navbar-nav">
                  {/* <li className="nav-item">
                     <Link to="/" className="nav-link">
                        My Account
                     </Link>
                  </li> */}
                  {/* <li className="nav-item">
                     <Link to="/products" className="nav-link">
                        Products
                     </Link>
                  </li> */}
                  {signedIn ? (
                     <Fragment>
                        <li className="nav-item">
                           <Link to="/wishlist" className="nav-link">
                              Wishlist
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/notification" className="nav-link" title="Notification">
                              <i className="fa fa-bell big mr-3" ></i>
                           </Link>

                        </li>
                        <li className="nav-item">
                           <Link to="/account" className="nav-link" title="Account">
                              <i className="fa fa-user big mr-3" ></i>
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/account" className="nav-link" title="Logout">
                              <i className="fa fa-sign-out big" ></i>
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
         </div>
      </nav>
      
   );
}

export default PrimaryNav;
