import React from "react";

function CustomerFormReturn({
  customers,
  onChangeTextEntered,
  textEntered,
  filterCustomers,
  showhide,
  customer
}) {
  return (
    <div class="form-group">
      <div className="inline-block">
        <button className="fa fa-search" onClick={filterCustomers} />
        <div className="col">
          <input
            name="customer"
            type="text"
            className="form-control"
            placeholder="e.g. 000000000"
            value={textEntered}
            onChange={onChangeTextEntered}
          />
        </div>
      </div>
      <div id="returnCustomer">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Select</th>
              <th scope="col">Phone Number</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Works at</th>
            </tr>
          </thead>
          {customers.map(c => (
            <tbody>
              <tr>
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="customer"
                    id="customerID"
                    value={c._id}
                  />
                </th>
                <td>{c.phone}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.workAt}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default CustomerFormReturn;
