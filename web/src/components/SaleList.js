import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import SaleEditForm from "./SaleEditForm";

function SaleList({
  sales,
  deleteSale,
  multiplyNumbers,
  capitalizeWord,
  sortByDate,
  customers,
  onClickEditSale,
  editSaleObject
}) {
  return (
    <div className="col ">
      <h2 className="text-center mb-4">Sales</h2>
      {sales &&
        customers && (
          <section className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Weather</th>
                  <th scope="col">Total</th>
                  <th scope="col">Location</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>

              {sortByDate(sales, "date").map((sale, index) => {
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
                          {moment(sale.date).format("YYYY-MM-DD")}
                        </td>
                        <td
                          data-toggle="collapse"
                          data-target={`#${sale._id}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          {sale.weather.description}
                        </td>
                        <td
                          data-toggle="collapse"
                          data-target={`#${sale._id}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          ${sale.totalPrice}
                        </td>
                        <td
                          data-toggle="collapse"
                          data-target={`#${sale._id}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          {capitalizeWord(sale.type)}
                        </td>
                        <td
                          data-toggle="collapse"
                          data-target={`#${sale._id}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          {sale.inCharge.userName}
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
                            data-target={`#modaledit`}
                            onClick={() => {
                              onClickEditSale(sale);
                            }}
                          />
                          <i
                            className="fa fa-trash med mx-1"
                            id="trash"
                            style={{ cursor: "pointer" }}
                            title="Delete"
                            data-toggle="modal"
                            data-target={`#modaldelete-${sale._id}`}
                          />
                          {/* Begin modal */}

                          {/* Begin Delete modal */}
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
                                <div className="modal-body">
                                  Are you sure you would like to delete this
                                  sale?
                                </div>
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
                          {/* End Delete modal */}
                          {/* End modal */}
                        </td>
                      </tr>

                      {/* Collapse sale begin */}
                      <tr>
                        <td colSpan="10" className="p-0">
                          <div className="collapse" id={sale._id}>
                            <div className="card card-body m-3">
                              <table className="table">
                                <thead>
                                  <tr className="table-light">
                                    <th scope="col">Product Code</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  {sale.products.map(s => {
                                    return (
                                      <tr key={s._id}>
                                        <th scope="row">
                                          {s.product
                                            ? s.product.code
                                            : "deleted"}
                                        </th>
                                        <td>
                                          {s.product
                                            ? s.product.title
                                            : "deleted"}
                                        </td>
                                        <td>
                                          {s.product
                                            ? s.product.price
                                            : "deleted"}
                                        </td>
                                        <td>
                                          {s.product ? s.unitAmount : "deleted"}
                                        </td>
                                        <td>
                                          {multiplyNumbers(
                                            s.product ? s.product.price : 0,
                                            s.unitAmount
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
      {/* Begin Edit modal*/}
      <div
        className="modal fade"
        id={`modaledit`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Sale</h5>
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
              {editSaleObject && <SaleEditForm saleObject={editSaleObject} />}
            </div>
          </div>
        </div>
      </div>
      {/* End Eidt modal*/}
    </div>
  );
}

export default SaleList;
