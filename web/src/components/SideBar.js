import React from "react";
import { Link } from "react-router-dom";
import { ExportRawdata } from "../components/ExportRawdata";

function SideBar({ signedIn }) {
	return (
		<nav className="col-md-2 bg-light " id="sidebar">
			<ul className="nav nav-pills ">
				<li className="nav-item" style={{ display: "inline" }}>
					<Link to="/new-sales" className="nav-link">
						New Sales
					</Link>
				</li>

				<li className="nav-item">
					<Link
						to="#reportSubmenu"
						data-toggle="collapse"
						aria-expanded="false"
						className="nav-link"
					>
						Report
					</Link>
					<ul className="collapse list-unstyled" id="reportSubmenu">
						<li className="nav-item">
							<Link to="/report-daily" className="nav-link ml-3">
								Daily
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/report-weekly" className="nav-link ml-3">
								Weekly
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="#"
								className="nav-link ml-3"
								data-toggle="modal"
								data-target="#rawdata"
							>
								Rawdata
							</Link>
								{/* beginning of modal */}
								<div className="modal fade" id="rawdata">
									<div className="modal-dialog" role="document">
										<div className="modal-content" id="rawdata-modal-content">
											<div className="modal-header">
												<h5 className="modal-title">Rawdata</h5>
												<button
													type="button"
													className="close"
													data-dismiss="modal"
													aria-label="Close"
												>
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div className="modal-body" >
												<p>Do you want to download rawdata?</p>
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-light"
													data-dismiss="modal"
												>
													Cancel
												</button>
												<ExportRawdata />
											</div>
										</div>
									</div>
								</div>
								{/* end of modal */}
						</li>
					</ul>
				</li>
				<li className="nav-item">
					<Link to="/sales" className="nav-link">
						Sales
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/products" className="nav-link">
						Products
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/customers" className="nav-link">
						Customers
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default SideBar;
