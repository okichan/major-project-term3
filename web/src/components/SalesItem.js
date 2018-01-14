import React from "react";

function SalesItem({ products }) {
  return (
    <div className="col salesItem">
      <div className="form-group">
        <div className="col">
          <label className="control-label">Product</label>
          <select name="brandName" className="form-control">
            {products.map(m => <option>{m.title}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="col">
          <label className="control-label">Price</label>
          <div className="input-group">
            <input
              name="mobile"
              className="form-control"
              defaultValue={products[0].price}
              type="number"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="col">
          <label className="control-label">Quantity</label>
          <div className="input-group">
            <input type="number" className="form-control" min="1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesItem;
