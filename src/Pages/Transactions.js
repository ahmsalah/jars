import React from 'react';
import Navbar from '../components/Navbar';
import Summary from '../components/Summary';
import TransactionsList from '../components/TransactionsList';
import Filters from '../components/Filters';
import Sidebar from '../components/Sidebar';
import { Paper } from '@material-ui/core';

function Transactions() {
	return (
		<React.Fragment>
			<Sidebar />
			<Navbar />

			<div
				style={{
					maxWidth: '650px',
					margin: '120px auto 50px',
					flex: 1
				}}>
				<Summary />

				<Paper style={{ overflow: 'hidden' }}>
					<Filters />
					<TransactionsList />
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default Transactions;
