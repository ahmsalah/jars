import React from 'react';
import { Line } from 'react-chartjs-2';
import blue from '@material-ui/core/colors/blue';

function LineChart({ chartData }) {
	const months = chartData.map(v => v.month);
	const totalData = chartData.map(v => v.total);

	const data = {
		labels: [ '', ...months ],
		datasets: [
			{
				data: [ 0, ...totalData ],
				backgroundColor: 'rgba(33,150,243,.4)',
				borderColor: blue[500],
				pointBackgroundColor: blue[900],
				lineTension: 0.2,
				pointBorderWidth: 1.5,
				pointHoverRadius: 6,
				pointHitRadius: 20
			}
		]
	};

	return (
		<Line
			options={{
				responsive: true,
				legend: {
					display: false
				}
			}}
			data={data}
		/>
	);
}

export default LineChart;
