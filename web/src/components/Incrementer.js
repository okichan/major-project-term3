import React from "react";

function Incrementer({ label, elementId, elementName={elementId}, defaultValue="1" }) {
	return (
		<div className="form-group">
			<label htmlFor="amount">{label}</label>
			<div className="input-group">
				<div className="input-group-prepend">
					<span
						className="input-group-text pointer"
						onClick={e => {
							let amount = document.getElementById(elementId);
							if (amount.value > 1) {
								amount.value = Number(amount.value) - 1;
							}
						}}
					>
						<i className="fa fa-minus" />
					</span>
				</div>
				<input
					id={elementId}
					name={elementName}
					type="number"
					className="text-center amount-input"
					defaultValue={defaultValue}
				/>
				<div className="input-group-append">
					<span
						className="input-group-text pointer"
						onClick={e => {
							let amount = document.getElementById(elementId);
							if (/\d/.test(amount.value)) {
								amount.value = Number(amount.value) + 1;
							}
						}}
					>
						<i className="fa fa-plus" />
					</span>
				</div>
			</div>
		</div>
	);
}

export default Incrementer;
