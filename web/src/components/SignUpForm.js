import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function SignUpForm({ onSignUp }) {
   return (
      <div className="row mt-5">
         <div className="login-screen bg-white box-shadow">
            <img src={logo} className="logo" alt="logo" /> <small>Management System</small>
            <h2 className="text-center m-4 text-shadow">Add User</h2>
            <form
               className="col-md-6 offset-md-3"
               onSubmit={event => {
                  // Prevent old-school form submission
                  event.preventDefault();

                  const form = event.target;
                  const elements = form.elements; // Allows looking up fields using their 'name' attributes
                  // Get entered values from fields
                  const username = elements.username.value;
                  const password = elements.password.value;

                  // Pass this information along to the parent component
                  onSignUp({ username, password });
               }}
            >
               <div className="col-auto">
                  <div className="input-group my-3">
                     <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-user" /></div>
                     </div>
                     <input type="text" name="username" className="form-control" placeholder="username" />
                  </div>
               </div>
               <div className="col-auto">
                  <div className="input-group my-3">
                     <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-unlock-alt" />&nbsp;</div>
                     </div>
                     <input type="password" name="password" className="form-control" placeholder="password" />
                  </div>
               </div>

               <div className="col-auto my-3">
                  <button type="submit" className="btn btn-info mb-2">Add user</button>
               </div>

               <div>
                  <Link to="/signin">
                     <i className="fa fa-arrow-left mt-3 ml-3" /> Back
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
}

export default SignUpForm;
