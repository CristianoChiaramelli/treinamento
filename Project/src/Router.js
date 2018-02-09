import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from './Login';
import ItemList from './ItemList';
import ShoppingCart from './ShoppingCart';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';

const Tabs = TabNavigator({
	ItemListTab: {
		screen: ItemList,
		navigationOptions: {
			tabBarLabel: 'Produtos',
		}
	},
	ShoppingCartTab: {
		screen: ShoppingCart,
		navigationOptions: {
			tabBarLabel: 'Carrinho de compras',
		}
	},
	UserProfileTab: {
		screen: UserProfile,
		navigationOptions: {
			tabBarLabel: 'Perfil',
		},
	},
});

const Root = StackNavigator({
	LoginPage: {
		screen: Login,
		navigationOptions: {
			title: 'Faça seu login',
		},
	},
	InsidePage: {
		screen: Tabs,
		navigationOptions: {
			title: 'Nome do aplicativo',
		},
	},
	EditProfilePage: {
		screen: EditProfile,
		navigationOptions: {
			title: 'Editar perfil',
		}
	},
});

export { Root, Tabs };
