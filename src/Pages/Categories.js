import React, { useContext } from 'react';
import { CategoriesContext } from '../context/categories.context';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/Sidebar';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		flex: '1'
	},
	content: {
		margin: `${spacing(12)}px auto ${spacing(2)}px`,
		maxWidth: spacing(82),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	noCategories: {
		padding: spacing(15, 6),
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

function Categories() {
	const classes = useStyles();
	const { expCategories, incCategories, onSortEnd } = useContext(CategoriesContext);

	return (
		<div className={classes.root}>
			<Sidebar />
			<Navbar display="categories" />
			<div className={classes.content}>
				{incCategories.length || expCategories.length ? (
					<React.Fragment>
						<CategoryList
							type="exp"
							categories={expCategories}
							onSortEnd={onSortEnd}
							distance={10}
							style={{ display: 'none' }}
							// pressDelay={100}
						/>
						<CategoryList
							type="inc"
							categories={incCategories}
							onSortEnd={onSortEnd}
							distance={10}
							// pressDelay={100}
						/>
					</React.Fragment>
				) : (
					<div className={classes.noCategories}>
						<Typography variant="h2">{`No categories :)`}</Typography>
					</div>
				)}
			</div>
		</div>
	);
}

export default Categories;
