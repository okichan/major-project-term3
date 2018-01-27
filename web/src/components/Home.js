import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import CustomerTrafficForm from "./CustomerTrafficForm";

function Home({ signedIn, onCreateCustomerTraffics }) {
  return (
    <div className="row">
      <div className="col" id="traffic">
        <CustomerTrafficForm onChange={onCreateCustomerTraffics} />
        <hr />
      </div>
      <div className="col" id="">
        <CurrencyConverter />
        <hr />
        <Weather />
        <hr />
      </div>
    </div>
  );
}

export default Home;
