import React, { Component } from 'react';
import { AsyncStorage, Alert, Image, View, TouchableOpacity, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import addButtonImage from '../assets/add-button-hi.png';
import ShoppingCart from './ShoppingCart';

const CART_URL = 'http://192.168.0.15:1337/cartList/';

class SingleItem extends Component {

  async addProduct(item, father){

    const userId = father.props.loggedIn.id;

    //Gets the current shopping cart
    let currentShoppingCart = await AsyncStorage.getItem(`cartuser${userId}`);

    //If its null, set it as an empty one. Otherwise, parses it
    currentShoppingCart = currentShoppingCart?JSON.parse(currentShoppingCart):[];
    
    //Checks if the added product is in it
    const currentProduct = currentShoppingCart.find((prod) => prod.id === item.id);

    if (currentProduct){ //If so, increments its quantity
      currentProduct.quantity += 1;
    } else { //Else, push the whole ordered product to the array
      currentShoppingCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
    
    console.log('ShoppingCart object will be set to ', currentShoppingCart);
    await AsyncStorage.setItem(`cartuser${userId}`, JSON.stringify(currentShoppingCart));
    father.props.fetchShoppingCart(userId);
  }

  render() {
    if (!this.props.header)
    console.log('FATHER:', this.props.father.props.loggedIn);

    return (
      <View style={this.props.index%2==0?styles.evenItem:styles.oddItem}>
        <Text style={this.props.header?styles.headerText:styles.text}>{this.props.item.name}</Text>
        <Text style={this.props.header?styles.headerText:styles.text}>{this.props.item.price}</Text>
        {!this.props.header && 
          <TouchableOpacity onPress={() => this.addProduct(this.props.item, this.props.father)}>
            <Image
              style={styles.button}
              source={addButtonImage}
            />
          </TouchableOpacity>
        }{this.props.header &&
          <View style={styles.buttonSeparator} />
        }
      </View>
      )
  }
}

class ItemList extends Component {

  componentDidMount(){
    this.props.fetchProductList();
  }


  renderHeader = () => {
    const headerItem = {
      name: 'Produto',
      price: 'Preço',
    }
    return <SingleItem item={headerItem} index={1} header={true}/>;
  }
  render() {
    if (!this.props.productList){
      //Still didnt load
      return <Text>Carregando...</Text>;
    }
    console.log(this.props.productList);
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data = {this.props.productList}
          renderItem = {({item, index}) => {
            return (<SingleItem item={item} index={index} father={this}></SingleItem>)
          }}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => item.id}

        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  evenItem: {
    flex: 1,
    backgroundColor: '#EEE',
    flexDirection: 'row',
  },
  oddItem: {
    flex: 1,
    backgroundColor: '#DDD',
    flexDirection: 'row',
  },
  headerText: {
    color: '#000',
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    flex:1,
    fontWeight: 'bold',
  },
  text: {
    color: '#000',
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    flex:1,
  },
  addButton: {
    backgroundColor: '#000',
    height: 40,
    width: 40,
  },  
  button: {
    alignItems: 'center',
    height: 40,
    width:40,
    flex:1,
  },
  buttonSeparator: {
    height: 40,
    width:40,
  }
});

const mapStateToProps = (state) => {
  return {
    productList: state.productList,
    shoppingCart: state.shoppingCart,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, actions)(ItemList);
