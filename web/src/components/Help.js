import React from "react";
import index from '../home-with-index.png'
import createSalesImg from '../create-sales.png'
import productbtn from '../productbtn.png'

function Help() {
   return (
      <div className="p-4">
         <h1 className="pb-3">How to use</h1>
         <img
            src={index}
            width="100%"
            alt="index"
         />

         <ol className="ordered-list mt-3">
            <li>Useful Links <p>Links outside of Tanto Management System.</p></li>
            <li>Notifications <p>If any, notifies you 2 things; products low on stock / sharpening reminder.</p></li>
            <li>Customer Traffic <p>Lets you log customers who entered the store. This data will be used to generate report. <br /> The "view all" link takes you to view the history.</p></li>
            <li>New Sales <p>Lets you create a new sales record.</p></li>
            <li>Report <p>Lets you do 3 things; <br />
               - Generate Daily report<br />
               - Generate Weekly report<br />
               - Export data to Excel files <br />
            </p>
               <p>Daily and Weekly report are calculated by the data from Customer Traffic and Sales record.</p></li>
            <li>Sales <p>Shows the history of all the sales, also lets you edit/delete a sale <i>(caution: modifying sales record may affect Reporting)</i>.</p></li>
            <li>Products <p>Shows the list of all the products, also lets you create/edit/delete a product.</p></li>
            <li>Customers
               <p>Shows the list of all the customers, also lets you create/edit/delete a new customer. <br />
                  <i>Note this data is only the collection of customer info and NOT part of customer traffic pie chart report.</i>
               </p>
            </li>
         </ol>
         <hr />
         <h2 className="py-4">How do I...</h2>

         <ul className="ordered-list mt-3">
            <li>Create new sales? <br /><p>Go to "New Sales" page.</p>
               <img
                  src={createSalesImg}
                  width="50%"
                  alt="create-sales"
                  style={{ border: "1px solid #ccc" }}
               />

               <ol className="ordered-list-sub">
                  <li>Date <p>Defaulted to today, but you can choose past too.</p></li>
                  <li>Filter product <p>Default is all.</p></li>
                  <li>Select product <p>Sorted by product code. The number inside "()" means the current stock.</p></li>
                  <li>Price <p>Once you select a product, RRP will automatically be set. You can edit if necessary.</p></li>
                  <li>Amount <p>Amount of that specific product you selected. Default is 1.</p></li>
                  <li>Add more <p>Click here if one sales transaction contains multiple products.</p></li>
                  <li>Remove <p>If you accidentally clicked "add more", you can remove it by clicking here.</p></li>
                  <li>Sales location <p>Either Store or Online.</p></li>
                  <li>Customer <p>You can select the customer who made this purchase.</p></li>
                  <li>Create new customer <p>If the purchase was made by a new customer, you can register them here.</p>
                     <p><i>Note this field cannot be left blank, if you could not collect their information, please set this to "Default Customer".</i></p></li>
               </ol>

            </li>
            <li>Create new product/customers? <p>Go to each page and find a button that looks like this.</p>
            <img
                  src={productbtn}
                  alt="create-sales"
               /></li>
           
         </ul>
      </div>
   );
}

export default Help;
