import React from "react";

const ProductFilter = ({ prodCategory }) => {
	let input;

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
            prodCategory(input.value);
            // input.value = ""
			}}
		>
			<input
				ref={node => {
					input = node;
				}}
				type="text"
				className="input-medium search-query"
			/>
			<button className="btn ">
				<i className="fa fa-search" />
			</button>
		</form>
	);
};

export default ProductFilter;
