import React, { Fragment } from "react";
// import Product from "./Product";

// create notification body
function createNotificationsBody(type, data) {
	if (type === "stock" && data) {
		//stock body
		return `${data.title}'s stock is ${data.stock} now. Please consider re-ordering.`;
	} else if (data) {
		//sharpening
		return `More than 80 days have passed since ${
			data.customer.firstName
		} last purchased knife(s). Please send a sharpening reminder.`;
	} else {
		return "Error loading notification";
	}
}

function NotificationList({ notifications, onClickDelete, onClickToggle }) {
	return (
		notifications && (
			<Fragment>
				<h2 className="text-center m-3">Notification list</h2>
				<div className="col-md-10 mx-auto ">
					<input
						className="mb-2 btn btn-warning btn-sm"
						type="button"
						value="Delete ticked notificaions"
						onClick={() => {
							onClickDelete();
						}}
					/>

					{notifications.map(notification => {
						const chosenData =
							notification.type === "stock" ? notification.product : notification.sale;
						return (
							<div class="custom-control custom-checkbox my-2">
								<input
                           className="custom-control-input"
									type="checkbox"
									id={`check${notification._id}`}
									onClick={e => {
										const judge = e.target.checked;
										onClickToggle(notification._id, { checked: judge });
									}}
								/>
								<label className="custom-control-label" htmlFor={`check${notification._id}`}>
									{createNotificationsBody(notification.type, chosenData)}
								</label>
							</div>
						);
					})}
				</div>
			</Fragment>
		)
	);
}

export default NotificationList;
