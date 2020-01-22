import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const loader = document.querySelector('.loader');
// const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

ReactDOM.render(
	<BrowserRouter>
		<App hideLoader={hideLoader} />
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.register();
