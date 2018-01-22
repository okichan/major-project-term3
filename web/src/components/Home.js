import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import CustomerTrafficForm from "./CustomerTrafficForm";

function Home({ signedIn, onCreateCustomerTraffics }) {
  return (
    <div>
      <div className="component">
        <CustomerTrafficForm onChange={onCreateCustomerTraffics} />
        <hr />
      </div>
      <div className="component">
        <CurrencyConverter />
        <hr />
      </div>
      <div className="component">
        <Weather />
      </div>
    </div>
  );
}

export default Home;
