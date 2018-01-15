import React, { Fragment } from "react";
import LinkButton from "./LinkButton";
import { Link } from "react-router-dom";

function CustomerList({
  customers,
  editedCustomerID,
  onEditCustomer,
  renderEditForm
}) {
  return (
    <Fragment>
      <h2 className="text-center mb-4">Customers</h2>
      {customers && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Note</th>
              <th scope="col" />
            </tr>
          </thead>

          {customers.map(customer => {
            const date = new Date(customer.registerDate).toLocaleDateString(
              "ja-JP",
              { timeZone: "Australia/Melbourne" }
            );
            return (
              <Fragment key={customer._id}>
                <tbody>
                  <tr
                    className="row-hover"
                    data-toggle="collapse"
                    data-target={`#${customer._id}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <td>
                      {customer.firstName ? customer.firstName : "(unknown)"}{" "}
                      {customer.lastName ? customer.lastName : ""}
                    </td>

                    <td>{customer.phone ? customer.phone : "(unknown)"}</td>

                    <td className="w-50">{customer.note}</td>

                    <td>
                      <a href={`/products/${customer._id}`}>
                        <i
                          className="fa fa-pencil-square-o med"
                          id="edit"
                          title="Edit"
                        />
                      </a>
                      <span className="mr-2"> </span>
                      <i
                        className="fa fa-trash med"
                        id="trash"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          alert("delete function here");
                        }}
                        title="Delete"
                      />
                    </td>
                  </tr>

                  {/* collapse begin */}
                  <tr>
                    <td colSpan="5" className="p-0">
                      <div className="collapse" id={customer._id}>
                        <div className="card card-body m-3">
                          <div className="row">
                            <div className="col-md-6 ">
                              <p>Registered: {date}</p>
                              <p>{customer.gender}</p>
                              <p>
                                Email:
                                {customer.email ? customer.email : " (unknown)"}
                              </p>
                            </div>
                            <div className="col-md-6 ">
                              <p>Customer Origin: {customer.origin}</p>
                              <p>Chef: {customer.isChef ? "Yes" : "No"}</p>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <p className="col-12 ">Purchase History:</p>
                          </div>
                          <div id="purchase-history">
                            <ul>
                              {/* {customer.purchasedHistory.map(m => {
															<li>{m.sale._id}</li>
														})} */}
                              <li>test</li>
                              <li>test</li>
                              <li>test</li>
                              <li>test</li>
                              <li>test</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* collapse end */}
                </tbody>
              </Fragment>
            );
          })}
        </table>
      )}
    </Fragment>
  );
}

export default CustomerList;
