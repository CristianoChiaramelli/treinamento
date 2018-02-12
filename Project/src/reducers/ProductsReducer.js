const initialState = {
	productList: null,
	shoppingCart: null,
};

export default (state = initialState, action) => {

	switch(action.type){
		case 'FETCH_PRODUCT_LIST':
			return {
				...state,
				productList: action.productList,
			}
		case 'FETCH_SHOPPING_CART':
			return {
				...state,
				shoppingCart: action.shoppingCart,
			}
		default:
			return state;
	}
}