import React, { Fragment } from "react";
// import Product from "./Product";

// create notification body
function createNotificationsBody(type, data) {
  if (type === "stock" && data) {
    //stock body
    return `${data.title}'s stock is ${data.stock} now. `;
  } else if (data) {
    //sharpening
    if (data.customer) {
      return `${data.customer.firstName} (${
        data.customer.email ? data.customer.email : "email unknown"
      })`;
    } else {
      return `More than 80 days have passed since Deleted Customer last purchased knife(s). Please send a sharpening reminder.`;
    }
  } else {
    return "Error loading notification";
  }
}

function NotificationList({ notifications, onClickDelete, onClickToggle }) {
  return (
    notifications && (
      <Fragment>
        <h2 className="text-center m-3">Notification list</h2>
        <div className="col-md-7 mx-auto">
          <input
            className="mb-0 btn btn-warning btn-sm"
            type="button"
            value="Delete checked"
            onClick={() => {
              onClickDelete();
            }}
          />

          {notifications.map(notification => {
            const chosenData =
              notification.type === "stock"
                ? notification.product
                : notification.sale;
            return (
              <div>
                {notification.type === "stock" ? (
                  <div
                    className="row my-4 py-3"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <input
                      type="checkbox"
                      id={`check${notification._id}`}
                      className="notification-checkbox sr-only"
                      onClick={e => {
                        const judge = e.target.checked;
                        console.log(judge);

                        onClickToggle(notification._id, { checked: judge });
                      }}
                    />
                    <label className="col" htmlFor={`check${notification._id}`}>
                      <strong>
                        <a
                          href={`#${notification._id}`}
                          data-toggle="collapse"
                          role="button"
                          aria-expanded="false"
                          aria-controls="showdetails"
                        >
                          {createNotificationsBody(
                            notification.type,
                            chosenData
                          )}
                        </a>
                      </strong>
                      <br />
                      Please consider re-ordering.
                    </label>
                    {/* begin detail */}
                    {notification.product && (
                      <div className="col-12 collapse " id={notification._id}>
                        <p className="m-0 p-0">
                          Code: {notification.product["code"]}
                        </p>
                        <p className="m-0 p-0">
                          Price: {notification.product["stock"]}
                        </p>
                        <p className="m-0 p-0">
                          Stock: {notification.product["stock"]}
                        </p>
                        <p className="m-0 p-0">
                          Total sales: {notification.product["totalSales"]}
                        </p>
                      </div>
                    )}
                    {/* end detail */}
                  </div>
                ) : (
                  <div
                    className="row my-4 py-3"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <input
                      type="checkbox"
                      id={`check${notification._id}`}
                      className="notification-checkbox sr-only"
                      onClick={e => {
                        const judge = e.target.checked;

                        onClickToggle(notification._id, { checked: judge });
                      }}
                    />
                    <label
                      className="col-10"
                      htmlFor={`check${notification._id}`}
                    >
                      More than 80 days have passed since{" "}
                      <strong>
                        <a
                          href={`#${notification._id}`}
                          data-toggle="collapse"
                          role="button"
                          aria-expanded="false"
                          aria-controls="showdetails"
                        >
                          {createNotificationsBody(
                            notification.type,
                            chosenData
                          )}
                        </a>
                      </strong>{" "}
                      last purchased knife(s). Please send a sharpening
                      reminder.
                    </label>
                    {/* begin detail */}
                    {notification.sale.customer && (
                      <div className="col-12 collapse" id={notification._id}>
                        <p className="m-0 p-0">
                          Gender: {notification.sale.customer["gender"]}
                        </p>
                        <p className="m-0 p-0">
                          Phone: {notification.sale.customer["phone"]}
                        </p>
                        <p className="m-0 p-0">
                          Notes: {notification.sale.customer["note"]}
                        </p>
                      </div>
                    )}
                    {/* end detail */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Fragment>
    )
  );
}

export default NotificationList;
