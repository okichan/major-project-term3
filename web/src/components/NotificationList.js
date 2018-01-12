import React, { Fragment } from "react";
// import Product from "./Product";

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
          return (
            <div className="row">
              <p>{notification.type}</p>
              <p>{notification.notificationDate}</p>{" "}
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
