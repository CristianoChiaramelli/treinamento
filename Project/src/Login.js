import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux';
import * as actions from './actions';
import * as Alerts from './alerts';

const LOCAL_LOGIN_URL = 'http://192.168.0.15:1337';
const AUTH_URL = LOCAL_LOGIN_URL+'/auth';

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

  loginAttempt(){

    fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.err){
          console.log('Erro no login', responseJson.err);
          Alerts.DefaultError();
        } else if(!responseJson.name){
          console.log('Usuario nao encontrado');

          Alerts.WrongPasswordAlert();

        } else {
          const user = {
            id: responseJson.id,
            name: responseJson.name,
            email: this.state.email,
          }
          this.props.setLogged(user);
          this.props.navigation.navigate('InsidePage');
        }
    })
    .catch((err) => {
      console.log('ERROR ON LOGIN', err);
      Alerts.DefaultError();
    })
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

        <TouchableOpacity style = {styles.submitButton} onPress = {() => this.loginAttempt()} >
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
