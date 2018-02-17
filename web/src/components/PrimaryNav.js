import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function PrimaryNav({ signedIn, signOut, notificationCount, currentUser }) {
	return (
		<nav className="navbar navbar-expand-sm navbar-light" style={{ background: "#E5E5E5" }}>
			<Link to="/" className="mr-3">
				{" "}
				<img src={logo} style={{ width: "140px" }} alt="logo" />
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#collapsibleNavbar"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="collapsibleNavbar">
				<ul className="nav nav-justified ">
					<li className="nav-item link-dark mx-3 big">
						<a
							className="menu"
							href="https://www.qthotelsandresorts.com/melbourne/evt-admin"
							target="_blank"
							title="Wordpress"
							rel="noopener noreferrer"
						>
							<i className="fa fa-wordpress" />
						</a>
					</li>
					<li className="nav-item link-dark mx-3 big">
						<a
							className="menu"
							href="https://transact.nab.com.au/nabtransact/"
							target="_blank"
							title="NAB"
							rel="noopener noreferrer"
						>
							<i className="fa fa-star" />
						</a>
					</li>
					<li className="nav-item link-dark mx-3 big">
						<a
							className="menu"
							href="https://www.qthotelsandresorts.com/melbourne/eat-drink/tanto/"
							target="_blank"
							title="QT Hotel"
							rel="noopener noreferrer"
						>
							<i className="fa fa-building-o" />
						</a>
					</li>
					<li className="nav-item link-dark mx-3 big">
						<a
							className="menu"
							href="https://vimeo.com/user16748524/review/188253523/dc2848426c"
							target="_blank"
							title="Vimeo"
							rel="noopener noreferrer"
						>
							<i className="fa fa-vimeo" />
						</a>
					</li>
				</ul>

				<div className="ml-auto">
					<ul className="nav nav-justified">
						{signedIn ? (
							<Fragment>
								<li
									className="nav-item  link-dark my-auto"
									style={{ whiteSpace: "nowrap" }}
									id="greeting"
								>
									Hello {`${currentUser.username}`}
								</li>
								<li className="nav-item link-dark">
									<Link to="/notifications" className="nav-link " title="Notification">
										<i className="fa fa-bell big mr-3 ">
											<span
												className="badge badge-pill badge-danger "
												id="notification-badge"
											>
												{notificationCount === 0 ? "" : notificationCount}
											</span>
										</i>
									</Link>
								</li>
								<li className="nav-item  link-dark">
									<Link
										to="/account"
										className="nav-link"
										title="Logout"
										data-toggle="modal"
										data-target="#logout"
									>
										<i className="fa fa-sign-out big" />
									</Link>

									{/* beginning of modal */}
									<div className="modal fade" id="logout">
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title">Log out</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close"
													>
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body text-left">
													<p>{`Are you sure you would like to sign out ${
														currentUser.username
													} ?`}</p>
												</div>
												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-light"
														data-dismiss="modal"
													>
														Cancel
													</button>
													<button
														type="button"
														className="btn btn-danger"
														onClick={signOut}
														data-dismiss="modal"
													>
														Log out
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* end of modal */}
									{/* <button >
                           <i className="fa fa-sign-out big" ></i>
                                    </button> */}
								</li>
							</Fragment>
						) : (
							<Fragment>
								<li className="nav-item">
									<Link to="/signin" className="nav-link">
										Sign In
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/signup" className="nav-link">
										Sign Up
									</Link>
								</li>
							</Fragment>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default PrimaryNav;
