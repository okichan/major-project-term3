import React from 'react';
import { listCustomers } from '../api/customers';
import { listProducts } from '../api/products';
import { listSales } from '../api/sales';
import { listCustomerTraffics } from '../api/customerTraffics';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const flattenObject = function(ob) {
	let toReturn = {};
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		if (typeof ob[i] == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
};

export class ExportRawdata extends React.Component {
	state = {
		sales: null,
		products: null,
		customers: null,
		traffic: null
	};

	render() {
		const { sales, products, customers, traffic } = this.state;
		let today = moment(new Date()).format('YYYYMMDDHHmm');
		return (
			<div>
				{sales &&
					traffic &&
					customers &&
					products && (
						<div>
							<CSVLink
								data={sales}
								filename={`sales-${today}.csv`}
								className="btn btn-info mx-1"
							>
								Sales
							</CSVLink>
							<CSVLink
								data={products}
								filename={`product-${today}.csv`}
								className="btn btn-info mx-1"
							>
								Product
							</CSVLink>
							<CSVLink
								data={customers}
								filename={`customer-${today}.csv`}
								className="btn btn-info mx-1"
							>
								Customer
							</CSVLink>
							<CSVLink
								data={traffic}
								filename={`traffic-${today}.csv`}
								className="btn btn-info ml-1"
							>
								Traffic
							</CSVLink>
						</div>
					)}
			</div>
		);
	}

	componentDidMount() {
		listSales().then(sales => {
			let salesFlatten = [];
			sales.map(sale => {
				salesFlatten.push(flattenObject(sale));
			});
			this.setState({ sales: salesFlatten });
		});
		listProducts().then(products => {
			this.setState({ products });
		});
		listCustomers().then(customers => {
			let customersFlatten = [];
			customers.map(customer => {
				customersFlatten.push(flattenObject(customer));
			});
			this.setState({ customers: customersFlatten });
		});
		listCustomerTraffics().then(customerTraffics => {
			this.setState({ traffic: customerTraffics });
		});
	}
}
