import React, { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../context/categories.context';
import CategoryList from '../components/CategoryList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader';
import TipsExpansionPanel from '../components/TipsExpansionPanel';
import Layout from '../components/Layout';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		flex: '1',
		[breakpoints.up('lg')]: {
			marginRight: spacing(7.5)
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
	expansionPanelContainer: {
		maxWidth: 400,
		margin: spacing(0, 3, 3),
		[breakpoints.up('sm')]: {
			// margin: spacing(0, 1.5, 3),
			maxWidth: 608
		},
		[breakpoints.up('md')]: {
			maxWidth: 658,
			width: 658,
			margin: spacing(0, 0, 3)
		}
	},
	noCategories: {
		padding: spacing(6, 3),
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& img': {
			filter: 'grayscale(50%)',
			opacity: 0.9,
			width: spacing(25),
			marginTop: spacing(2)
		},
		'& > h4': {
			fontSize: '1.5rem',
			color: 'rgba(0,0,0,0.5)',
			textAlign: 'center',
			marginBottom: spacing(1),
			[breakpoints.up('sm')]: {
				fontSize: '2.125rem'
			}
		}
	}
}));

function Categories() {
	const classes = useStyles();
	const categories = useContext(CategoriesContext);

	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			categories !== undefined ? setIsLoading(false) : setIsLoading(true);
		},
		[ categories ]
	);

	return (
		<Layout>
			<div className={classes.root}>
				<div className={classes.content}>
					{isLoading || !categories.lists ? (
						<Loader />
					) : Object.keys(categories.allCategories).length ? (
						<React.Fragment>
							<div className={classes.expansionPanelContainer}>
								<TipsExpansionPanel
									title="Tips"
									message="You can reorder categories by holding a category and then drag it up or down."
								/>
							</div>
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
										categories={categoriesList}
									/>
								);
							})}
						</React.Fragment>
					) : (
						<div className={classes.noCategories}>
							<Typography variant="h4">No categories here</Typography>
							<Typography variant="h4">start adding now</Typography>
							<img src={require(`../assets/sad-jar.png`)} alt="No Transactions" />
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}

export default Categories;
