import React from 'react'
import { Link } from 'react-router-dom'

function DeleteCustomer({ firstName, lastName }) {
  return (
    <div className="deleteCustomer">
      <h1 className="text-center">
        {firstName} {lastName}
      </h1>
      <p>Are you sure you would like to delete this customer?</p>
      <button
        type="button"
        className="deleteCustomerButtom btn btn-danger btn-lg info"
      >
        Delete
      </button>
      <Link to="/customer">
        <button
          type="button"
          className="deleteCustomerButtom btn btn-defualt btn-lg info"
        >
          Cancel
        </button>
      </Link>
    </div>
  )
}

export default DeleteCustomer
