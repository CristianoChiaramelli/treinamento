import { AsyncStorage } from 'react-native';
import { PRODUCTS_URL } from './globals';

export const setLogged = (value) => {
	return {
		type: 'SET_LOGGED',
		loggedIn: value,
	};
};

export const fetchProductList = async () => {

    const productList = await fetch(PRODUCTS_URL)
    .then((response) => response.json())
    .then((responseJson) => {

        if (responseJson.err){
          console.log('Erro na lista de produtos', responseJson.err);
          	return null;
        } else {
  			return responseJson;
        }
    })
    .catch((err) => {
      console.log('Erro na lista de produtos', err);
    });

	return {
		type: 'FETCH_PRODUCT_LIST',
		productList: productList,
	};
};

export const fetchShoppingCart = async (userid) => { //Fetch the userId cart
    console.log('Fetching shopping cart', userid);

    let shoppingCart = await AsyncStorage.getItem(`cartuser${userid}`, (err, result) => {
    	if (err) console.log('Erro', err);
    });
    shoppingCart = shoppingCart?JSON.parse(shoppingCart):[];

    console.log('Fetched: ', shoppingCart);
    if (!shoppingCart) shoppingCart = [];

	return {
		type: 'FETCH_SHOPPING_CART',
		shoppingCart: shoppingCart,
	};
};