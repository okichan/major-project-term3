import React from "react";

function SalesForm({ initialProduct = {}, submitTitle, onSubmit }) {
   return (
      <div className="container">
         <h1 className="text-center">Log new sales</h1>

         <div class="">
            <form
               className="test"
               onSubmit={event => {
                  // Prevent old-school form submission
                  event.preventDefault();

                  const form = event.target;
                  const elements = form.elements; // Allows looking up fields using their 'name' attributes
                  // Get entered values from fields
                  const brandName = elements.brandName.value;
                  const name = elements.name.value;

                  // Pass this information along to the parent component
                  onSubmit({ brandName, name });
               }}
            >
               <fieldset>
                  <div className="form-group">
                     <div className="col-md-6">
                        <label className="control-label" for="nome">
                           Product
                        </label>
                        <input
                           name="brandName"
                           className="form-control"
                           placeholder="Kelly"
                           type="text"
                           defaultValue={initialProduct.brandName}
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="col-md-6">
                        <label className="control-label" for="mobile">
                           Sold at
                        </label>
                        <div className="input-group">
                           <input
                              name="mobile"
                              className="form-control"
                              placeholder="9211-4957"
                              type="text"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="col-md-6">
                        <label className="control-label" for="mobile">
                           Quantity
                        </label>
                        <div className="input-group">
                           <select class="form-control" id="sel1">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="col-md-6">
                        <label className="control-label" for="email">
                           Email
                        </label>
                        <input
                           name="email"
                           className="form-control"
                           placeholder="kelly.slater.surf@gmail.com"
                           type="text"
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="col-md-6">
                        <label className="control-label" for="district">
                           District
                        </label>
                        <input
                           name="district"
                           className="form-control"
                           placeholder="Botafogo"
                           type="text"
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="col-md-6">
                        <button
                           type="button"
                           className="btn btn-primary btn-lg btn-block info"
                        >
                           Send
                        </button>
                     </div>
                  </div>
               </fieldset>
            </form>
         </div>
      </div>
   );
}

export default SalesForm;
