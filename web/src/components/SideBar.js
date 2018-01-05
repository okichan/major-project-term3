import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function SideBar({ signedIn }) {
   return (
      <nav className="col-sm-3 col-md-2 bg-light sidebar" style={{borderRight: "1px solid lightgray"}}>
         <ul className="nav nav-pills flex-column">
            <li className="nav-item" style={{display: "inline"}}>
               <a href="/new-sales" className="nav-link">
                  New Sales
               </a>
            </li>

            <li className="nav-item">
               <a
                  href="#homeSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link"
               >
                  Report
               </a>
               <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li className="nav-item">
                     <a href="/report-1" className="nav-link ml-3">
                        Monthly
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#" className="nav-link ml-3">
                        Customer Origin
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#" className="nav-link ml-3">
                        Something
                     </a>
                  </li>
               </ul>
            </li>
            <li className="nav-item">
               <a href="/products" className="nav-link">
                  Products
               </a>
            </li>
            <li className="nav-item">
               <a href="/customers" className="nav-link">
                  Customers
               </a>
            </li>
            <li className="nav-item">
               <a href="/notification" className="nav-link">
                  Notification
               </a>
            </li>
            <li className="nav-item">
               <a href="/tools" className="nav-link">
                  Tools
               </a>
            </li>
         </ul>
      </nav>
   );
}

export default SideBar;
