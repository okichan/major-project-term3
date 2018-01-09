import React from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

function SignInForm({ onSignIn }) {
   return (
      // <div className="container-fluid ">
         <div className="row mt-5">
            <div className="login-screen bg-white box-shadow">
               <img src={logo} className="logo" />{" "}
               <small>store management system</small>
               <h2 className="text-center mt-4 text-shadow">Sign In</h2>
               <form
                  onSubmit={event => {
                     // Prevent old-school form submission
                     event.preventDefault();

                     const form = event.target;
                     const elements = form.elements; // Allows looking up fields using their 'name' attributes
                     // Get entered values from fields
                     const email = elements.email.value;
                     const password = elements.password.value;

                     // Pass this information along to the parent component
                     onSignIn({ email, password });
                  }}
               >
                  <fieldset>
                     <div className="form-group">
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                           <label className="control-label ">Email</label>
                           <div className="input-group">
                              <input type="email" name="email" />
                           </div>
                        </div>
                     </div>

                     <div className="form-group">
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                           <label className="control-label">Password</label>
                           <div className="input-group">
                              <input type="password" name="password" />
                           </div>
                        </div>
                     </div>

                     <div className="form-group">
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                           <button className="btn btn-primary">Sign In</button>
                        </div>
                     </div>
                  </fieldset>
               </form>
               <Link to="/signup" className="">
                  <i className="fa fa-user-plus mt-3 ml-3" />
                  <span> Sign Up</span>
               </Link>

            </div>
         </div>
      // </div>
   );
}

export default SignInForm;
