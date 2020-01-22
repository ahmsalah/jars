import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import Budgets from './pages/Budgets';
import Jars from './pages/Jars';
import Reports from './pages/Reports';

function Routes() {
	return (
		<Switch>
			<PrivateRoute exact path="/" component={Transactions} />
			<Route exact path="/login" component={Login} />
			<PrivateRoute exact path="/categories" component={Categories} />
			<PrivateRoute exact path="/budgets" component={Budgets} />
			<PrivateRoute exact path="/jars" component={Jars} />
			<PrivateRoute exact path="/reports" component={Reports} />
		</Switch>
	);
}

export default Routes;
