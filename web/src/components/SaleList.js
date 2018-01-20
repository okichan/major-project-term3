import React, { Fragment } from "react";
import SalesFormEdit from "./SalesFormEdit";

function SaleList({ sales, deleteSale, editSale, multiplyNumbers }) {
  return (
    <div className="col ">
      <h2 className="text-center mb-4">Sales</h2>
      {sales && (
        <section className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">At</th>
                <th scope="col">Operator</th>
                <th scope="col">Customer</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            {sales.map(sale => {
              const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ];
              const day = days[new Date(sale.date).getDay()];
              const date = `${day}, ${new Date(sale.date).toLocaleString(
                "ja-JP",
                {
                  timeZone: "Australia/Melbourne"
                }
              )}`;

              return (
                <Fragment key={sale._id}>
                  <tbody>
                    <tr className="row-hover">
                      <td
                        data-toggle="collapse"
                        data-target={`#${sale._id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        {date}
                      </td>
                      <td
                        data-toggle="collapse"
                        data-target={`#${sale._id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        $ {sale.totalPrice}
                      </td>
                      <td
                        data-toggle="collapse"
                        data-target={`#${sale._id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        {sale.type}
                      </td>
                      <td
                        data-toggle="collapse"
                        data-target={`#${sale._id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        {sale.inCharge.firstName} {sale.inCharge.lastName}
                      </td>
                      <td
                        data-toggle="collapse"
                        data-target={`#${sale._id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        {sale.customer
                          ? sale.customer.firstName
                          : "Customer unknown"}{" "}
                        {sale.customer ? sale.customer.lastName : ""}
                        <br />
                        <small>
                          {sale.customer ? sale.customer.phone : ""}
                        </small>
                      </td>
                      <td>
                        <i
                          className="fa fa-pencil-square-o med mx-1"
                          id="edit"
                          style={{ cursor: "pointer" }}
                          title="Edit"
                          data-toggle="modal"
                          data-target={`#modaledit-${sale._id}`}
                        />
                        <i
                          className="fa fa-trash med mx-1"
                          id="trash"
                          style={{ cursor: "pointer" }}
                          title="Delete"
                          data-toggle="modal"
                          data-target={`#modaldelete-${sale._id}`}
                        />
                      </td>
                    </tr>
                    {/* Delete modal */}

                    <div
                      className="modal fade"
                      id={`modaldelete-${sale._id}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModal">
                              {sale._id}
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">...</div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteSale(sale._id);
                              }}
                              data-dismiss="modal"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edit modal */}

                    <div
                      className={`modaledit-${sale._id}-modal-lg modal fade`}
                      id={`modaledit-${sale._id}`}
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              class="modal-title text-center"
                              id="exampleModalLabel"
                            >
                              Edit Sale #{sale._id} <small>{sale.date}</small>
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <SalesFormEdit saleId={sale} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* collapse begin */}
                    <tr>
                      <td colSpan="10" className="p-0">
                        <div className="collapse" id={sale._id}>
                          <div className="card card-body m-3">
                            <table class="table">
                              <thead>
                                <tr className="table-light">
                                  <th scope="col">Product Code</th>
                                  <th scope="col">Product</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Total</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                {sale.products.map(s => {
                                  return (
                                    <tr>
                                      <th scope="row">{s.product.code}</th>
                                      <td>{s.product.title}</td>
                                      <td>{s.unitAmount}</td>
                                      <td>
                                        {multiplyNumbers(
                                          s.product.price * s.unitAmount
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Fragment>
              );
            })}
          </table>
        </section>
      )}
    </div>
  );
}

export default SaleList;
