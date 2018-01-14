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
    <div className="col ">
      <div className="customerListHeader">
        <div className="customerListHeading">
          <h2>Customers</h2>
        </div>
        <div className="customerListHeadingButton">
          <Link to="/admin/new-customer">
            <button type="button" className="btn btn-primary btn-lg info">
              Add New Customers
            </button>
          </Link>
        </div>
      </div>
      <table
        className="table table-sm"
        style={{ borderBottom: "1px solid silver" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">RRP</th>
            <th scope="col">Stock</th>
            <th scope="col" />
          </tr>
        </thead>

        {customers.map(customer => {
          return (
            <Fragment key={customer._id}>
              <tbody>
                <tr
                  className="header"
                  style={{ borderBottom: "2px solid transparent" }}
                >
                  <td>{customer.firstName}</td>

                  <td>
                    <a
                      data-toggle="collapse"
                      href={`#${customer.lastName}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      {customer.note}
                    </a>
                  </td>
                  <td>${customer.firstName}</td>
                  <td className="text-center">{customer.isChef}</td>
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
                <tr>
                  <td colSpan="5">
                    <div className="collapse" id={customer.firstName}>
                      <div className="card card-body">
                        <div className="row">
                          <div className="col-2">
                            <p>Total sales: {customer.firstName}</p>
                          </div>
                          <div className="col-3">
                            <p>Total Orders: {customer.firstName}</p>
                          </div>
                          <div className="col-3">
                            <p>Cost JPY: xxx</p>
                            <p>Cost AUD: xxx</p>
                          </div>
                        </div>

                        <img
                          src="https://www.qthotelsandresorts.com/melbourne/wp-content/uploads/sites/9/2017/05/Jam-on-Your-Collar-Tanto-0098.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Fragment>
          );
        })}
      </table>
    </div>
  );
}

export default CustomerList;
