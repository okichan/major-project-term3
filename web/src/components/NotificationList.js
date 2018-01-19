import React, { Fragment } from "react";
// import Product from "./Product";

// create notification body
function createNotificationsBody(type, data) {
   if (type === "stock" && data) {
     //stock body
     return `${data.title}'s stock is ${
       data.stock
     } now. `;
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
						className="mb-2 btn btn-warning btn-sm"
						type="button"
						value="Delete all"
						onClick={() => {
							onClickDelete();
						}}
					/>

					{notifications.map(notification => {
						const chosenData =
							notification.type === "stock" ? notification.product : notification.sale;
						return (
							<div>
								{notification.type === "stock" ? (
									<div className="row">
										<div className="col-10">
											<strong>
												<a href="#">
													{createNotificationsBody(notification.type, chosenData)}
												</a>
											</strong>
											<br />Please consider re-ordering.
										</div>
										<i className="fa fa-check-square-o pointer huge " id="notification-check" />
										{/* begin detail */}
										<div className="col-12 ">
											<small>Code: {notification.product["code"]}</small>
											<small>Price: {notification.product["stock"]}</small>
											<small>Stock: {notification.product["stock"]}</small>
                                 <hr />
										</div>
										{/* end detail */}
									</div>
								) : (
									<div className="row">
										<div className="col-10 ">
											More than 80 days have passed since {" "}
											<strong>
												<a href="#">
                                    {createNotificationsBody(notification.type, chosenData)}
												</a>
											</strong>
											{" "}last purchased knife(s). Please send a sharpening reminder.
										</div>
											<i className="fa fa-check-square-o pointer huge" id="notification-check"/>
                                 <div className="col-12 ">
											<small>Code: {notification.sale.customer["gender"]}</small>
                                 <hr />
										</div>
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
