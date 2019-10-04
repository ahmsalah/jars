import React from 'react';
import CategoryItem from './CategoryItem';
import { SortableContainer } from 'react-sortable-hoc';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import useStyles from '../styles/CategoryListStyles';
import Paper from '@material-ui/core/Paper';

const CategoryList = SortableContainer(({ categories, removeCategory, type }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<List className={classes.list}>
				<Typography className={classes.title} color="inherit">
					{type === 'exp' ? 'Expenses' : 'Income'}
				</Typography>

				{categories.map((ct, i) => (
					<React.Fragment key={ct.id}>
						<CategoryItem
							index={i}
							id={ct.id}
							name={ct.name}
							type={ct.type}
							removeCategory={removeCategory}
							collection={type}
						/>
						{i < categories.length - 1 && (
							<Divider className={classes.divider} />
						)}
					</React.Fragment>
				))}
			</List>
		</Paper>
	);
});

export default CategoryList;
