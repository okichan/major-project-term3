import React from "react";

function CustomerTrafficForm({}) {
	return (
		<div className="row ">
			<div className="col-md-6 mx-auto m-1">
				<h1 className="text-center">Customers</h1>
				<div className="trafficForm">
					<form className="form">
						<div className="form-group">
							<label htmlFor="CustomerNumber">People</label>
							<select
								multiple
								className="form-control"
								id="CustomerNumber"
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
								<option>10</option>
							</select>
						</div>
						<div className="form-check">
							<label className="isChef" htmlFor="isChef">
								Is Chef?
							</label>
							<input
								className="isChef"
								type="checkbox"
								value=""
								id="isChef"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Save
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CustomerTrafficForm;
