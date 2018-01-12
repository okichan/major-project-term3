import React, { Fragment } from "react";
// import Product from "./Product";

// create notification body
function createNotificationsBody(type, data) {
  if (type === "stock") {
    //stock body
    return `${data.title}'s stock is ${data.stock} now. Please order.`;
  } else {
    //sharpening
    return `It has been 80days since this sale happend with ${
      data.customer.firstName
    }. Please send a sharpening reminder`;
  }
}

function NotificationList({ notifications, onClickDelete, onClickToggle }) {
  return (
    notifications && (
      <div className="container">
        <input
          type="button"
          value="Delete done notificaions"
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
            <div className="row">
              <p>{createNotificationsBody(notification.type, chosenData)}</p>
              <input
                type="button"
                value={notification.checked ? "✅" : "🔲"}
                onClick={e => {
                  const judge = e.target.value === "🔲" ? true : false;
                  onClickToggle(notification._id, { checked: judge });
                }}
              />
            </div>
          );
        })}
      </div>
    )
  );
}

export default NotificationList;
