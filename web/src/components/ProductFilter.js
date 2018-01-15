import React from "react";
const arr = [
	"All",
	"Wa-Bocho",
	"Damascus",
	"Carbon Steel",
	"Inox Steel",
	"SP Inox",
	"Saya",
	"Hayate",
	"Stone"
];

const ProductFilter = ({ prodCategory }) => {
	return (
		<section className="d-flex justify-content-between flex-wrap mb-4">
			{arr.map((pick, index) => {
				return (
					<div className="form-check form-check-inline" key={index}>
						<input
							className="form-check-input"
							type="radio"
							name="category"
							id="inlineRadio1"
							value={pick}
							key={index}
							onChange={e => {
                        const category = e.target.value
                        if (category !== "All") {
                           prodCategory(e.target.value);
                        } else {
                           prodCategory("");
                           
                        }

							}}
						/>
						<label className="form-check-label mr-4" htmlFor="inlineRadio1" key={pick}>
							{pick}
						</label>
					</div>
				);
			})}
		</section>
	);
};

export default ProductFilter;