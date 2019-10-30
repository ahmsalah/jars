import React, { createContext, useState, useRef } from 'react';

export const SnackbarContext = createContext();
export const SnackbarActionContext = createContext();

export function SnackbarProvider(props) {
	const queueRef = useRef([]);
	const [ open, setOpen ] = useState(false);
	const [ messageInfo, setMessageInfo ] = useState(undefined);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleExited = () => {
		processQueue();
	};

	const processQueue = () => {
		if (queueRef.current.length > 0) {
			setMessageInfo(queueRef.current.shift());
			setOpen(true);
		}
	};

	const openSnackbar = message => () => {
		queueRef.current.push({
			message,
			key: new Date().getTime()
		});

		if (open) {
			// immediately begin dismissing current message
			// to start showing new one
			setOpen(false);
		} else {
			processQueue();
		}
	};

	// const openSnackbar = message => {
	// 	switch (message) {
	// 		case 'ADD_CATEGORY':
	// 			return handleOpenSnackbar('New category added');
	// 		case 'DELETE_CATEGORY':
	// 			return handleOpenSnackbar('Category deleted');
	// 		case 'ADD_TRANSACTION':
	// 			return handleOpenSnackbar('New transaction added');
	// 		case 'DELETE_TRANSACTION':
	// 			return handleOpenSnackbar('Transaction deleted');
	// 	}
	// };

	return (
		<SnackbarContext.Provider
			value={{
				open,
				messageInfo,
				handleClose,
				handleExited
			}}>
			<SnackbarActionContext.Provider
				value={{
					snackbarAddTransaction: openSnackbar('New Transaction Added'),
					snackbarDeleteTransaction: openSnackbar('Transaction Deleted'),
					snackbarAddCategory: openSnackbar('New Category Added'),
					snackbarDeleteCategory: openSnackbar('Category Deleted')
				}}>
				{props.children}
			</SnackbarActionContext.Provider>
		</SnackbarContext.Provider>
	);
}
