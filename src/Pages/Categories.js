import React from 'react';
import Navbar from '../Components/Navbar';
import CategoryList from '../Components/CategoryList';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		flex: '1'
	},
	content: {
		margin: `${spacing(15)}px auto ${spacing(5)}px`,
		maxWidth: spacing(80),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
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

function Categories({
	expCategories,
	incCategories,
	addCategory,
	removeCategory,
	onSortEnd
}) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Navbar display="categories" addCategory={addCategory} />
			<div className={classes.content}>
				{incCategories.length !== 0 || expCategories.length !== 0 ? (
					<React.Fragment>
						<CategoryList
							type="exp"
							categories={expCategories}
							removeCategory={removeCategory}
							onSortEnd={onSortEnd}
							distance={10}
							style={{ display: 'none' }}
							// pressDelay={100}
						/>
						<CategoryList
							type="inc"
							categories={incCategories}
							removeCategory={removeCategory}
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
