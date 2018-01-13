import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import CustomerTrafficForm from "./CustomerTrafficForm";

function Home({ signedIn }) {
   return (
      <div >
         <CustomerTrafficForm />
         <hr/>
         <CurrencyConverter />
         <hr/>
         <Weather />
      </div>
   );
}

export default Home;