import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
// import Sidebar from './Sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expCategories: [
				{ id: 1, name: 'Taxi', type: 'exp' },
				{ id: 2, name: 'Groceries', type: 'exp' },
				{ id: 3, name: 'Internet', type: 'exp' }
			],
			incCategories: [
				{ id: 51, name: 'Salary', type: 'inc' },
				{ id: 52, name: 'Savings', type: 'inc' }
			]
		};
	}

	removeCategory = (id, type) => {
		if (type === 'exp') {
			this.setState({ expCategories: this.state.expCategories.filter(ct => ct.id !== id) });
		} else if (type === 'inc') {
			this.setState({ incCategories: this.state.incCategories.filter(ct => ct.id !== id) });
		}
	};

	addCategory = (newCategory, type) => {
		if (type === 'exp') {
			this.setState({ expCategories: [ ...this.state.expCategories, newCategory ] });
		} else if (type === 'inc') {
			this.setState({ incCategories: [ ...this.state.incCategories, newCategory ] });
		}
	};

	render() {
		const { expCategories, incCategories } = this.state;

		return (
			<div className="App">
				<Sidebar />
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Home expCategories={expCategories} incCategories={incCategories} />}
					/>
					<Route
						exact
						path="/categories"
						render={() => (
							<Categories
								expCategories={expCategories}
								incCategories={incCategories}
								addCategory={this.addCategory}
								removeCategory={this.removeCategory}
							/>
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

export default App;
