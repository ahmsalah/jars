import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';

function BarChart({ chartData }) {
	const months = chartData.map(v => v.month);
	const expData = chartData.map(v => v.totalExp * -1);
	const incData = chartData.map(v => v.totalInc);

	const theme = useTheme();
	const data = {
		labels: months,
		datasets: [
			{
				label: 'Income',
				data: incData,
				backgroundColor: theme.palette.primary.sub,
				borderColor: theme.palette.primary.main,
				hoverBackgroundColor: theme.palette.primary.main,
				borderWidth: 1
			},
			{
				label: 'Expenses',
				data: expData,
				backgroundColor: theme.palette.secondary.sub,
				borderColor: theme.palette.secondary.main,
				hoverBackgroundColor: theme.palette.secondary.main,
				borderWidth: 1
			}
		]
	};

	return (
		<Bar
			options={{
				responsive: true,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
				}
			}}
			data={data}
		/>
	);
}

export default BarChart;
