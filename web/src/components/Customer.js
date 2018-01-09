import React from 'react'
import { Link } from 'react-router-dom'

function Customer({
  firstName,
  lastName,
  sex,
  email,
  phone,
  date,
  chef,
  customerOrigin,
  notes,
  purchaseHistory
}) {
  return (
    <div className="container">
      <h1 className="text-center">
        {firstName} {lastName}
      </h1>
      <div className="container">
        <div className="row">
          <div class="col-6">
            <h3>Sex</h3>
          </div>
          <div class="col-6">
            <p>{sex}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Email</h3>
          </div>
          <div class="col-6">
            <p>{email}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Phone</h3>
          </div>
          <div class="col-6">
            <p>{phone}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Date Registered</h3>
          </div>
          <div class="col-6">
            <p>{date}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Chef</h3>
          </div>
          <div class="col-6">
            <p>{chef}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Customer Origin</h3>
          </div>
          <div class="col-6">
            <p>{customerOrigin}</p>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Purchase history</h3>
          </div>
          <div class="col-6">
            <ul>
              <li>Knife 1</li>
              <li>Knife 2</li>
              <li>Knife 3</li>
              <li>Knife 4</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <h3>Notes</h3>
          </div>
          <div class="col-6">
            <p>{notes}</p>
          </div>
        </div>
      </div>
      <div className="customerButton">
        <div className="customerBtn">
          <Link to="/delete-customer">
            <button type="button" className="btn btn-danger btn-lg info">
              Delete
            </button>
          </Link>
        </div>
        <div className="customerBtn">
          <Link to="/edit-customer">
            <button type="button" className="btn btn-primary btn-lg info">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Customer
