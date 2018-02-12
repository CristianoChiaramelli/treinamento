import React, { Component } from 'react';
import { StyleSheet, Text, View , AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import Login from './src/Login';
import { Root } from './src/Router';
import productsReducer from './src/reducers/ProductsReducer';
import userInfoReducer from './src/reducers/UserInfoReducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(productsReducer, userInfoReducer);

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;