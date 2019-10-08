import React from 'react';
import CategoryItem from './CategoryItem';
import { SortableContainer } from 'react-sortable-hoc';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		margin: spacing(0, 2.5),
		flex: '1',
		padding: spacing(0, 0, 0.5),
		overflow: 'hidden',
		'& ul': {
			padding: '0',
			backgroundColor: palette.grey.light[5]
		}
	},
	title: {
		backgroundColor: palette.grey.light[1],
		padding: spacing(2, 4, 1.5),
		fontWeight: '500'
	}
}));

const CategoryList = SortableContainer(({ categories, removeCategory, type }) => {
	const classes = useStyles();

	return categories.length !== 0 ? (
		<Paper className={classes.root}>
			<List>
				<Typography className={classes.title} color="inherit">
					{type === 'exp' ? 'Expenses' : 'Income'}
				</Typography>

				{categories.map((ct, i) => (
					<React.Fragment key={ct.id}>
						<CategoryItem
							index={i}
							id={ct.id}
							name={ct.name}
							icon={ct.icon}
							type={ct.type}
							removeCategory={removeCategory}
							collection={type}
						/>
						{i < categories.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</List>
		</Paper>
	) : null;
});

export default CategoryList;
