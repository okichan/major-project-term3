import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function SideBar({ signedIn }) {
   return (
      <nav className="col-sm-3 col-md-2 bg-light sidebar" style={{borderRight: "1px solid lightgray"}}>
         <ul className="nav nav-pills flex-column">
            <li className="nav-item" style={{display: "inline"}}>
               <Link to="/new-sales" className="nav-link">
                  New Sales
               </Link>
            </li>

            <li className="nav-item">
               <Link
                  to="#homeSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link"
               >
                  Report
               </Link>
               <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li className="nav-item">
                     <Link to="/report-1" className="nav-link ml-3">
                        Monthly
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="#" className="nav-link ml-3">
                        Customer Origin
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="#" className="nav-link ml-3">
                        Something
                     </Link>
                  </li>
               </ul>
            </li>
            <li className="nav-item">
               <Link to="/products" className="nav-link">
                  Products
               </Link>
            </li>
            <li className="nav-item">
               <Link to="/customers" className="nav-link">
                  Customers
               </Link>
            </li>
            <li className="nav-item">
               <Link to="/notification" className="nav-link">
                  Notification
               </Link>
            </li>
            <li className="nav-item">
               <Link to="/tools" className="nav-link">
                  Tools
               </Link>
            </li>
         </ul>
      </nav>
   );
}

export default SideBar;
