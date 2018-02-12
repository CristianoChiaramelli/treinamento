import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';

const LOCAL_LOGIN_URL = 'http://192.168.0.26:1337';
const UPDATE_USER_URL = LOCAL_LOGIN_URL+'/updateuser';

class InfoItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoLine}>
          <Text style={styles.label}>{this.props.label}</Text>
          <TextInput defaultValue={this.props.value} 
            onChangeText = {(text) => {if (this.props.onChangeText) this.props.onChangeText(text)}} 
          />
        </View>
      </View>
    );
  }
}

//onChangeText={this.props.onChangeText} />
class EditProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: this.props.loggedIn.name,
      email: this.props.loggedIn.email,
    }
  }

  handleName = (text) => {
    this.setState({name: text});
  }

  handleEmail = (text) => {
    this.setState({email: text});
  }

  updateProfileValues = () => {

      const newUser = {
        id: this.props.loggedIn.id,
        name: this.state.name,
        email: this.state.email,
      }

      if (fetch(UPDATE_USER_URL, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
      })
      .then((response) => {
        if (response.err){
          console.log('Erro ao atualizar usuario', response.err);
          Alerts.DefaultError();
          return null;
        } else {
          return response;
        }
      })
      .catch((err) => {
        console.log('Erro ao atualizar usuario (fora)', err);
        Alerts.DefaultError();
      })) { this.props.setLogged(newUser); }

      this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <InfoItem 
          style={styles.input}
          label='Nome: ' 
          value={this.props.loggedIn.name} 
          onChangeText={this.handleName}>
        </InfoItem>
        <InfoItem 
          style={styles.input}
          label='Email: ' 
          value={this.props.loggedIn.email} 
          onChangeText={this.handleEmail}>
        </InfoItem>
              
        <TouchableOpacity style = {styles.button} onPress = {() => {this.updateProfileValues()}} >
          <Text style = {styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 18,
  },
  label: {
    paddingLeft: 20,
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    paddingTop: 3,
    backgroundColor: '#fff',
  },
  infoLine: {
    flexDirection: 'row',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1.
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    margin: 15,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
   loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps, actions)(EditProfile);
