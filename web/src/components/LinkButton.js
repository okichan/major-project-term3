import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ href, name }) {
   return (
      <div className="row m-2">
         <Link to={href} className="btn btn-primary ml-auto">
            <i className="fa fa-plus"/> {name} 
         </Link>
      </div>
   );
}

export default LinkButton;
