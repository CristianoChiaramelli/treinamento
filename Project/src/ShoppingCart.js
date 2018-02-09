import React, { Component } from 'react';
import { AsyncStorage, Alert, Image, View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet , FlatList } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import deleteButtonImage from '../assets/delete-button.png';

class SingleItem extends Component {


  async deleteProduct(item, father){

    const userId = father.props.loggedIn.id;

    //Gets the current shopping cart
    let currentShoppingCart = await AsyncStorage.getItem(`cartuser${userId}`);

    //If its null, set it as an empty one. Otherwise, parses it
    currentShoppingCart = currentShoppingCart?JSON.parse(currentShoppingCart):[];
    
    //Removes the product
    for (let i=0; i<currentShoppingCart.length; i++){
      if (currentShoppingCart[i].id === item.id){
        currentShoppingCart.splice(i,1);
      }
    }

    console.log('ShoppingCart object will be set to ', currentShoppingCart);
    await AsyncStorage.setItem(`cartuser${userId}`, JSON.stringify(currentShoppingCart));
    father.props.fetchShoppingCart(userId);
  }

  render() {
    return (
      <View style={this.props.index%2==0?styles.evenItem:styles.oddItem}>
        <Text style={styles.text}>{this.props.item.name}</Text>
        <Text style={styles.text}>{this.props.item.price}</Text>
        <Text style={styles.text}>{this.props.item.quantity}</Text>
       
        <TouchableOpacity onPress={() => this.deleteProduct(this.props.item, this.props.father)}>
        {!this.props.header && 
          <Image
            style={styles.button}
            source={deleteButtonImage}
          />
        }{this.props.header &&
          <View style={styles.buttonSeparator} />
        }
        </TouchableOpacity>
      </View>
      )
  }
}

class ShoppingCart extends Component {

  componentDidMount(){
    const userId = this.props.loggedIn.id;
    this.props.fetchShoppingCart(userId);
  }

  renderHeader = () => {
    const headerItem = {
      name: 'Produto',
      price: 'Preço',
      quantity: 'Quantidade',
    }
    return <SingleItem item={headerItem} index={1} header={true}/>;
  }

  render() {

    if (!this.props.shoppingCart){
      //Still didnt load
       console.log('Os produtos ainda nao foram carregados');

      return <Text>Carregando...</Text>;
    }

    console.log('Os produtos foram carregados!', this.props.shoppingCart);
    return (

      <ScrollView style={styles.container}>
        <FlatList
          data = {this.props.shoppingCart}
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
  text: {
    color: '#000',
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    flex:1,
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
   shoppingCart: state.shoppingCart,
   loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, actions)(ShoppingCart);
