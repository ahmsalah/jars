import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
// import Sidebar from './Sidebar';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Sidebar />
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/categories" render={() => <Categories />} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

export default App;
