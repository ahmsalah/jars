import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
import arrayMove from 'array-move';
import { pushToArrays } from './helpers';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCategories: [
				{ id: uuid(), name: 'Groceries', type: 'exp' },
				{ id: uuid(), name: 'Internet', type: 'exp' },
				{ id: uuid(), name: 'Taxi', type: 'exp' },
				{ id: uuid(), name: 'Salary', type: 'inc' },
				{ id: uuid(), name: 'Savings', type: 'inc' },
				{ id: uuid(), name: 'Bonus', type: 'inc' }
			],
			expCategories: [],
			incCategories: []
		};
	}
	componentDidMount() {
		this.splitCategories();
	}

	onSortEnd = ({ oldIndex, newIndex, collection }) => {
		if (collection === 'exp') {
			this.setState(({ expCategories }) => ({
				expCategories: arrayMove(expCategories, oldIndex, newIndex)
			}));
		} else if (collection === 'inc') {
			this.setState(({ incCategories }) => ({
				incCategories: arrayMove(incCategories, oldIndex, newIndex)
			}));
		}
	};

	removeCategory = id => {
		this.setState({ allCategories: this.state.allCategories.filter(ct => ct.id !== id) }, () =>
			this.splitCategories()
		);
	};

	splitCategories = () => {
		let [ incArray, expArray ] = pushToArrays(this.state.allCategories);
		this.setState({ expCategories: expArray, incCategories: incArray });
	};

	addCategory = newCategory => {
		this.setState({ allCategories: [ ...this.state.allCategories, newCategory ] }, () =>
			this.splitCategories()
		);
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
