import React, { Fragment } from "react";
const arr = [
  "All",
  "Wa-Bocho",
  "Damascus",
  "Carbon Steel",
  "Inox Steel",
  "SP Inox",
  "Saya",
  "Hayate",
  "Stone",
  "Sharpening"
];

const ProductFilterForNewSale = ({ prodCategory, countKey }) => {
  return (
    <Fragment>
      <small>Filter by category:</small>
      <br />
      <div
        className="btn-group btn-group-toggle flex-wrap mb-4"
        data-toggle="buttons"
      >
        {arr.map((pick, index) => {
          return (
            <label
              className="btn btn-secondary btn-sm"
              id={pick}
              htmlFor="inlineRadio1"
              key={pick}
              onClick={e => {
                const category = e.target.id;
                if (category !== "All") {
                  prodCategory(countKey, category);
                } else {
                  prodCategory(countKey, "");
                }
              }}
            >
              <input
                className="form-check-input "
                type="radio"
                name="category"
                value={pick}
                key={index}
              />
              {pick}
            </label>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ProductFilterForNewSale;
