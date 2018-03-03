import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function SignInForm({ onSignIn }) {
   return (
      <div className="row mt-5">
         <div className="login-screen bg-white box-shadow">
            <img src={logo} className="logo" alt="logo" /> <small>Management System</small>
            <h2 className="text-center m-4 text-shadow">Sign In</h2>
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
                  onSignIn({ username, password });
               }}
            >
               <div className="col-auto">
                  <div className="input-group my-3">
                     <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-user" /></div>
                     </div>
                     <input type="text" name="username" className="form-control" placeholder="username" required />
                  </div>
               </div>
               <div className="col-auto">
                  <div className="input-group my-3">
                     <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-unlock-alt" />&nbsp;</div>
                     </div>
                     <input type="password" name="password" className="form-control" placeholder="password" required />
                  </div>
               </div>

               <div className="col-auto my-3">
                  <button type="submit" className="btn btn-primary mb-2">Sign In</button>
               </div>
               {/* <div className="col-auto">
                  <Link to="/signup" className="">
                     <i className="fa fa-user-plus" />
                     <span> Add user</span>
                  </Link>
               </div> */}
            </form>
         </div>
      </div>
   );
}

export default SignInForm;
