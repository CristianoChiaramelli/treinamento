const initialState = {
	loggedIn: null,
};

export default (state = initialState, action) => {

	switch(action.type){
		case 'SET_LOGGED':
			return {
				...state,
				loggedIn: action.loggedIn,
			}
		default:
			return state;
	}
}