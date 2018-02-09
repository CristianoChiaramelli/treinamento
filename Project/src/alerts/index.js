import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export const WrongPasswordAlert = () => {
    Alert.alert(
	    'Usuário nao encontrado',
	    'O sistema nao encontrou o usuario digitado!',
	    [
	      {text: 'OK', onPress: () => console.log('OK Pressed')},
	    ]
	)
}

export const DefaultError = (err=400) => {

	Alert.alert(
	    'Algo deu errado',
	    'Erro '+err,
	    [
	      {text: 'OK', onPress: () => console.log('OK Pressed')},
	    ]
	)
}