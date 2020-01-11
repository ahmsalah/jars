import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function DoughnutChart({ chartData, colors }) {
	const up600 = useMediaQuery('(min-width:600px)');

	const labels = chartData.map(ct => `${ct.category} ${Math.round(ct.percentage)}%`);
	const values = chartData.map(ct => ct.amount);

	const data = {
		labels,
		datasets: [
			{
				data: values,
				backgroundColor: colors,
				hoverBorderColor: '#ffffff',
				hoverBorderWidth: 7
			}
		]
	};

	return (
		<div style={{ position: 'relative', minWidth: 280, minHeight: 280 }}>
			<Doughnut
				options={{
					responsive: true,
					maintainAspectRatio: false,
					aspectRatio: 1,
					legend: {
						position: up600 ? 'left' : 'top',
						labels: {
							fontFamily:
								"'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
						}
					}
				}}
				data={data}
			/>
		</div>
	);
}

export default DoughnutChart;
