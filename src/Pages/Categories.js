import React from 'react';
import Navbar from '../Components/Navbar';
import CategoryList from '../Components/CategoryList';
import useStyles from '../styles/CategoriesStyles';
// import Grid from '@material-ui/core/Grid';

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
				<CategoryList
					type="exp"
					categories={expCategories}
					removeCategory={removeCategory}
					onSortEnd={onSortEnd}
					distance={10}
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
			</div>
		</div>
	);
}

export default Categories;
