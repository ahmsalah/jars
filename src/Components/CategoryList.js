import React from 'react';
import CategoryItem from './CategoryItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import useSorting from '../hooks/useSorting';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		margin: spacing(3),
		flex: '1',
		minWidth: spacing(33),
		maxWidth: spacing(50),
		padding: spacing(0, 0, 0.5),
		overflow: 'hidden',
		[breakpoints.up('sm')]: {
			margin: spacing(3)
		},
		'& > div': {
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

const CategoryList = ({ categories, type, list }) => {
	const classes = useStyles();
	const { onCategoriesDragEnd } = useSorting();

	return !!categories.length ? (
		<DragDropContext onDragEnd={onCategoriesDragEnd}>
			<Droppable droppableId={type}>
				{provided => (
					<Paper
						className={classes.root}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<List component="div">
							<Typography className={classes.title} color="inherit">
								{list.title}
							</Typography>

							{categories.map((ct, i) => (
								<CategoryItem
									key={ct.id}
									index={i}
									id={ct.id}
									name={ct.name}
									icon={ct.icon}
									type={ct.type}
									categoriesLength={categories.length}
								/>
							))}
							{provided.placeholder}
						</List>
					</Paper>
				)}
			</Droppable>
		</DragDropContext>
	) : null;
};

export default CategoryList;
