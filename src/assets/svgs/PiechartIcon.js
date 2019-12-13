import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const PiechartIcon = props => {
	return (
		<SvgIcon viewBox="0 0 512 512" {...props}>
			<path d="M224 288V64C100.288 64 0 164.288 0 288s100.288 224 224 224 224-100.288 224-224c0-36.017-8.514-70.042-23.618-100.191L224 288zm232.382-164.191C419.606 50.401 343.695 0 256 0v224l200.382-100.191z" />
		</SvgIcon>
	);
};

export default PiechartIcon;
