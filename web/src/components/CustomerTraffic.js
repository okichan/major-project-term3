import React from "react";

const originObject = {
   Facebook: "SNS (Facebook, Twitter etc)",
   OnlineSearch: "Online Search",
   Referral: "Referral",
   Newspaper: "Newspaper Article",
   WalkIn: "Walk In",
   HotelGuest: "QT Hotel Guest",
   Return: "Return",
   Unknown: "Other / Unknown"
};

function CustomerTraffic({ traffic, deleteTraffic, updateTraffic }) {
  return (
    <div>
      <h1 className="text-center trafficHeading mt-5 mb-4">Customer Traffic</h1>
      <table className="table table-hover table-sm text-center">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Count</th>
            <th scope="col">Duration</th>
            <th scope="col">Origin</th>
            <th scope="col">Occupation</th>
            <th scope="col">Options</th>
          </tr>
        </thead>

        {traffic.map(traffic => {
          return (
            <tbody>
              <tr className="text-center" key={traffic._id}>
                <th scope="row">{traffic.createdAt.slice(0, -14)}</th>
                <td data-toggle="collapse" data-target={`#${traffic._id}`}>
                  {traffic.number}
                </td>
                <td data-toggle="collapse" data-target={`#${traffic._id}`}>
                  {traffic.duration} minutes
                </td>
                <td data-toggle="collapse" data-target={`#${traffic._id}`}>
                  {traffic.origin}
                </td>
                <td data-toggle="collapse" data-target={`#${traffic._id}`}>
                  {traffic.isChef}
                </td>
                <td>
                  <a href="#">
                    <i
                      className="fa fa-pencil-square-o med"
                      id="edit"
                      title="Edit"
                      data-toggle="modal"
                      data-target={`#modaledit-${traffic._id}`}
                    />
                  </a>
                  <span className="mr-2"> </span>
                  <i
                    className="fa fa-trash med"
                    id="trash"
                    style={{ cursor: "pointer" }}
                    title="Delete"
                    data-toggle="modal"
                    data-target={`#modaldelete-${traffic._id}`}
                  />

                  {/* Delete modal */}
                  <div
                    className="modal fade"
                    id={`modaldelete-${traffic._id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">{traffic._id}</h5>
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
                          Are you sure you would like to delete this entry?
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
                              deleteTraffic(traffic._id);
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
                    className={`modaledit-${traffic._id}-modal-lg modal fade`}
                    id={`modaledit-${traffic._id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-center"
                            id="exampleModalLabel"
                          >
                            Edit Entry #{traffic._id}
                          </h5>
                        </div>
                        <div className="modal-body">
                          <form
                            id={`editForm-${traffic._id}`}
                            className="form"
                            onSubmit={e => {
                              e.preventDefault();
                              const _id = traffic._id;
                              const number = e.target.CustomerNumber.value;
                              const isChef = e.target.chefSelect.value;
                              const origin = e.target.originSelect.value;
                              const duration = e.target.duration.value;
                              const note = e.target.note.value;

                              updateTraffic({
                                _id,
                                number,
                                origin,
                                isChef,
                                duration,
                                note
                              });
                            }}
                          >
                            <div className="form-check pl-0">
                              <label htmlFor="CustomerNumber">People</label>
                              <select
                                className="form-control"
                                id="CustomerNumber"
                                defaultValue={traffic.number}
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                                  return (
                                    <option
                                      key={`trafficId${num}`}
                                      value={num}
                                      defaultValue={traffic.number}
                                    >
                                      {num}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-check pl-0">
                              <label htmlFor="chefSelect">Is Chef?</label>
                              <select
                                className="form-control"
                                id="chefSelect"
                                defaultValue={traffic.isChef}
                              >
                                <option value={"Unknown"}>I don't know</option>
                                <option value={"Chef"}>Yes</option>
                                <option value={"Not Chef"}>No</option>
                              </select>
                            </div>
                            <div className="form-check pl-0">
                              <label htmlFor="originSelect">
                                Customers origin
                              </label>
                              <select
                                className="form-control"
                                id="originSelect"
                                defaultValue={traffic.origin}
                              >
                                {Object.keys(originObject).map(originkey => {
                                  return (
                                    <option value={originkey} key={originkey}>
                                      {originObject[originkey]}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Duration</label>
                              <input
                                className="form-control"
                                type="number"
                                id="duration"
                                defaultValue={traffic.duration}
                                placeholder="Number"
                              />
                            </div>
                            <div className="form-group">
                              <label>Notes</label>
                              <textarea
                                className="form-control"
                                id="note"
                                rows="4"
                                defaultValue={traffic.note}
                              />
                            </div>
                          </form>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              form={`editForm-${traffic._id}`}
                              className="btn btn-primary"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="10" className="p-0 ">
                  <div className="collapse" id={traffic._id}>
                    <div className="card card-body m-3">
                      <div className="row">
                        <p> Notes: {traffic.note}</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default CustomerTraffic;
