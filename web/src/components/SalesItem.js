import React, { Fragment } from "react";

function SalesItem({
  itemNumber,
  saleItem,
  products,
  saleId,
  productPrice,
  productQuantity,
  onChangeTitle,
  onChangePrice,
  onChangeQuantity
}) {
  return (
    <div className="col saleItem">
      <div className="form-group">
        <div className="col">
          <label className="control-label">Product</label>
          <select
            name="id"
            className="form-control"
            onChange={e => {
              onChangeTitle(itemNumber, e.target.value);
            }}
          >
            {products.map(m => {
              if (
                saleId.products[itemNumber].product
                  ? saleId.products[itemNumber].product._id
                  : null === m._id
              ) {
                return (
                  <option value={m._id} selected="selected">
                    {m.title}
                  </option>
                );
              } else {
                return <option value={m._id}>{m.title}</option>;
              }
            })}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="col">
          <label className="control-label">Price</label>
          <div className="input-group">
            <input
              name="salePrice"
              className="form-control"
              value={
                productPrice
                  ? productPrice
                  : saleId.products[itemNumber].product
                    ? saleId.products[itemNumber].product.price
                    : 0
              }
              type="number"
              onChange={e => {
                onChangePrice([itemNumber], e);
              }}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col">
          <label className="control-label">Quantity</label>
          <div className="input-group">
            <input
              name="unitAmount"
              type="number"
              className="form-control"
              min="1"
              value={
                productQuantity
                  ? productQuantity
                  : saleId.products[itemNumber].unitAmount
              }
              onChange={e => {
                onChangeQuantity([itemNumber], e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesItem;
