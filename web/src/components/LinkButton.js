import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ href, name }) {
   return (
      <div className="row m-2">
         <Link to={href} className="btn btn-primary ml-auto">
            Add new {name}
         </Link>
      </div>
   );
}

export default LinkButton;
