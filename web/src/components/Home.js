import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import CustomerTrafficForm from "./CustomerTrafficForm";

function Home({ signedIn, onCreateCustomerTraffics }) {
  return (
    <div className="row mt-5">
      <div className="col-lg-6" id="traffic">
        <CustomerTrafficForm onChange={onCreateCustomerTraffics} />
        <hr />
      </div>
      <div className="col-lg-6 float-right" id="">
        <CurrencyConverter />
        <hr />
        <Weather />
        <hr />
      </div>
    </div>
  );
}

export default Home;
