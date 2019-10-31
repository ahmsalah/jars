import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/auth.context';

const loader = document.querySelector('.loader');
// const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

ReactDOM.render(
	<BrowserRouter>
		<AuthProvider>
			<App hideLoader={hideLoader} />
		</AuthProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.register();
