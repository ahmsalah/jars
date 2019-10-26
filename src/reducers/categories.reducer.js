const categoriesReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CATEGORY':
			return [ ...state, action.category ];
		case 'REMOVE_CATEGORY':
			return state.filter(ct => ct.id !== action.id);
		default:
			return state;
	}
};

export default categoriesReducer;
