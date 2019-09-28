import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
import arrayMove from 'array-move';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expCategories: [
				{ id: uuid(), name: 'Taxi', type: 'exp' },
				{ id: uuid(), name: 'Groceries', type: 'exp' },
				{ id: uuid(), name: 'Internet', type: 'exp' }
			],
			incCategories: [
				{ id: uuid(), name: 'Salary', type: 'inc' },
				{ id: uuid(), name: 'Savings', type: 'inc' }
			]
		};
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ expCategories }) => ({
			expCategories: arrayMove(expCategories, oldIndex, newIndex)
		}));
	};

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
								onSortEnd={this.onSortEnd}
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
