import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux';
import { FetchLogin } from './fetches';
import * as actions from './actions';
import { WrongPasswordAlert, DefaultError } from './alerts';


const loginAttempt = () => {
  const ans = FetchLogin(email, password);
  if (!ans){
    WrongPasswordAlert();
  } else if (ans.err){
    DefaultError(ans.err);
  } else {
    //Successful
    console.log("Successful");
  }
}

class Login extends Component {

  state = {
    email: 'cris@gmail',
    password: ''
  }

  handleEmail = (text) => {
    this.setState({email: text});
  }
  handlePassword = (text) => {
    this.setState({password: text});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input}
           placeholder = "Email"
           onChangeText = {this.handleEmail} 
           defaultValue = "cris@gmail"/>
        
        <TextInput style = {styles.input}
           placeholder = "Senha"
           onChangeText = {this.handlePassword}
           secureTextEntry={true}/>

        <TouchableOpacity style = {styles.submitButton} onPress = {loginAttempt} >
          <Text style = {styles.submitText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    margin: 15,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    fontSize: 30,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitText: {
    color: '#fff',
  },
  container: {
    paddingTop: 23,
    backgroundColor: '#fff',

  },
});

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  };
}
export default connect(mapStateToProps, actions)(Login);