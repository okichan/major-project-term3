import React from "react";
import { default as ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";
import { listCustomers } from "../api/customers";
import { listProducts } from "../api/products";

export class ExportRawdata extends React.Component {
	state = {
		customers: null,
		products: null,
		dataSet2: [
			{
				name: "Johnson",
				total: 25,
				remainig: 16
			},
			{
				name: "Josef",
				total: 25,
				remainig: 7
			}
		]
	};

	render() {
		const { customers, products, dataSet2 } = this.state;
		return (
			<ExcelFile  filename="rawdata.xlsx" element={ <button className="btn btn-info m-3">Get rawdata</button> }>
				<ExcelSheet data={products} name="Products">
					<ExcelColumn label="Name" value="title" />
					<ExcelColumn label="Category" value="category" />
					<ExcelColumn label="Code" value="code" />
					<ExcelColumn label="RRP" value="price" />
					<ExcelColumn label="Total Sales" value="totalSales" />
					<ExcelColumn label="Stock" value="stock" />
				</ExcelSheet>
				<ExcelSheet data={dataSet2} name="Leaves">
					<ExcelColumn label="Name" value="name" />
					<ExcelColumn label="Total Leaves" value="totale" />
					<ExcelColumn label="Remaining Leaves" value="remaining" />
				</ExcelSheet>
				<ExcelSheet data={customers} name="Customers">
					<ExcelColumn label="First Name" value="firstName" />
					<ExcelColumn label="Last Name" value="lastName" />
					<ExcelColumn label="Date Registered" value="registerDate" />
					<ExcelColumn label="Last Name" value="gender" />
					<ExcelColumn
						label="Chef"
						value={col => (col.isChef ? "Y" : "N")}
					/>
					<ExcelColumn label="Email" value="email" />
					<ExcelColumn label="Phone" value="phone" />
					<ExcelColumn label="Customer Origin" value="origin" />
					<ExcelColumn label="Notes" value="note" />
					{/* <ExcelColumn label="Purchase History" value={col => (col.purchasedHistory[0].date)} /> */}
				</ExcelSheet>
			</ExcelFile>
		);
	}

	componentDidMount() {
		listCustomers().then(customers => {
			this.setState({ customers });
		});
		listProducts().then(products => {
			this.setState({ products });
		});
	}
}

// export default {ExportExcel, DataSet3};
