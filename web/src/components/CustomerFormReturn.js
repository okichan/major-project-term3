import React from "react";

function CustomerFormReturn({}) {
  return (
    <div className="container">
      <div className="">
        <div class="form-group">
          <label for="exampleInputEmail1">Customer</label>
          <input
            type="text"
            class="form-control"
            id="customerPhone"
            placeholder="e.g. Mobile number"
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerFormReturn;
