import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ href, name }) {
   return (
      <Link to={href}
      className="btn btn-primary float-right">Add new { name } </Link>
   );
}

export default LinkButton;
