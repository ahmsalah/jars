import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Providers from './Providers';
import Routes from './Routes';

function App({ hideLoader }) {
	useEffect(() => hideLoader(), [ hideLoader ]);

	return (
		<Providers>
			<CssBaseline />
			<Routes />
		</Providers>
	);
}

export default App;
