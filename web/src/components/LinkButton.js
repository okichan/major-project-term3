import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ href, name }) {
   return (
      <div className="float-right">
         <Link to={href} className="btn btn-primary">
            Add new {name}
         </Link>
      </div>
   );
}

export default LinkButton;
