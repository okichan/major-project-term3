import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import CustomerTrafficForm from "./CustomerTrafficForm";

function Home({ signedIn, onCreateCustomerTraffics }) {
  return (
    <div className="row mt-4">
      <div className="col-lg-5" id="traffic">
        <CustomerTrafficForm onChange={onCreateCustomerTraffics} />
        <hr />
      </div>
      <div className="col-lg-7" id="">
        <CurrencyConverter />
        <hr />
        <Weather />
        <hr />
      </div>
    </div>
  );
}

export default Home;
