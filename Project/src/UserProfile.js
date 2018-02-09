import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';

class InfoItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoLine}>
          <Text style={styles.label}>{this.props.label}</Text>
          <Text style={styles.text}>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}

class UserProfile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <InfoItem label='Nome: ' value={this.props.loggedIn.name}></InfoItem>
        <InfoItem label='Email: ' value={this.props.loggedIn.email}></InfoItem>

        <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('EditProfilePage')} >
          <Text style = {styles.buttonText}>Atualizar</Text>
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

export default connect(mapStateToProps, actions)(UserProfile);
