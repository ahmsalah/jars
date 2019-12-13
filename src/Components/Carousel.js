import React, { memo, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import clsx from 'clsx';
import { initialTransactions as transactions } from '../initialData';
import TransactionItem from './TransactionItem';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles/carousel.styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel({ open, handleClose }) {
	const classes = useStyles();
	const up600 = useMediaQuery('(min-width:600px)');
	const [ index, setIndex ] = useState(0);

	const handleChangeIndex = index => {
		setIndex(index);
	};

	return (
		<Modal
			closeAfterTransition
			onClose={handleClose}
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 1000
			}}
			open={open}>
			<Fade in={open} timeout={{ enter: 0, exit: 1000 }}>
				<div className={classes.root}>
					<AutoPlaySwipeableViews
						interval={4000}
						style={{ height: '100%' }}
						index={index}
						onChangeIndex={handleChangeIndex}>
						<div className={clsx(classes.slide, classes.slide1)}>
							<div>
								<Typography
									align="center"
									variant="h6"
									className={classes.typography}>
									Record each time you spend or recieve money.
								</Typography>
								<Paper className={classes.paper}>
									<List component="div" className={classes.list}>
										{transactions.map((tr, i) => (
											<React.Fragment key={i}>
												<TransactionItem
													carousel
													transaction={{ ...tr, id: i }}
												/>
												{i < transactions.length - 1 && <Divider />}
											</React.Fragment>
										))}
									</List>
								</Paper>
							</div>
						</div>
						<div className={clsx(classes.slide, classes.slide2)}>
							<div>
								<Typography
									align="center"
									variant="h6"
									className={classes.typography}>
									Create budgets and monitor your spending.
								</Typography>
								<div>
									<img
										src={require(up600
											? `../assets/budget1.png`
											: `../assets/budget2.png`)}
										alt="create budgets"
										className={classes.img}
									/>
								</div>
							</div>
						</div>
						<div className={clsx(classes.slide, classes.slide3)}>
							<div>
								<Typography
									align="center"
									variant="h6"
									className={classes.typography}>
									See exactly where your money is going.
								</Typography>
								<div>
									<img
										src={require(`../assets/pie-chart.png`)}
										alt="charts"
										className={classes.img}
									/>
								</div>
							</div>
						</div>
					</AutoPlaySwipeableViews>
					<div className={classes.ctaContainer}>
						<div className={classes.paginationContainer}>
							{[ ...new Array(3) ].map((v, i) => (
								<IconButton key={i} onClick={() => handleChangeIndex(i)}>
									<span
										className={
											index === i ? (
												clsx(classes.pagination, classes.pgActive)
											) : (
												clsx(classes.pagination, classes.pgColor)
											)
										}
									/>
								</IconButton>
							))}
						</div>
						<Button
							size="large"
							variant="contained"
							className={classes.button}
							onClick={handleClose}>
							Get Started
						</Button>
					</div>
				</div>
			</Fade>
		</Modal>
	);
}

export default memo(Carousel);
