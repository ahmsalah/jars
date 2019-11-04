import React, { useContext, useState, useEffect } from 'react';
import { CategoriesContext, DispatchContext } from '../context/categories.context';
import CategoryList from '../components/CategoryList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader';
import arrayMove from 'array-move';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		flex: '1',
		[breakpoints.up('lg')]: {
			transform: 'translateX(-60px)'
		}
	},
	content: {
		margin: `${spacing(5)}px auto ${spacing(2)}px`,
		maxWidth: spacing(82),
		[breakpoints.up('md')]: {
			maxWidth: spacing(88)
		},
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
	const categories = useContext(CategoriesContext);
	const dispatch = useContext(DispatchContext);

	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			categories !== undefined ? setIsLoading(false) : setIsLoading(true);
		},
		[ categories ]
	);

	//------ Dragging Categories -----//
	const onSortEnd = ({ oldIndex, newIndex, collection }) => {
		const categoryList = arrayMove(
			categories.lists[collection].categoriesIds,
			oldIndex,
			newIndex
		);
		dispatch({ type: 'MOVE_CATEGORIES', categoryList, categoryType: collection });
	};

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				{isLoading || !categories.lists ? (
					<Loader />
				) : Object.keys(categories.allCategories).length ? (
					<React.Fragment>
						{categories.listOrder.map(listID => {
							const list = categories.lists[listID];

							const categoriesList = list.categoriesIds.map(
								ctID => categories.allCategories[ctID]
							);

							return (
								<CategoryList
									key={listID}
									list={list}
									type={listID}
									collection={listID}
									categories={categoriesList}
									onSortEnd={onSortEnd}
									distance={10}
								/>
							);
						})}
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
