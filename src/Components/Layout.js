import React, { memo } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Layout({ children }) {
	const up600 = useMediaQuery('(min-width:600px)');

	return (
		<React.Fragment>
			<Navbar />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
				{up600 && <Sidebar />}
				{children}
			</div>
		</React.Fragment>
	);
}

export default memo(Layout);
