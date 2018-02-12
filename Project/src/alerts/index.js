import { Alert } from 'react-native'

export const WrongPasswordAlert = () => {
    Alert.alert(
	    'Usuário nao encontrado',
	    'O sistema nao encontrou o usuario digitado!',
	    [
	      {text: 'OK', onPress: () => console.log('OK Pressed')},
	    ]
	)
}

export const DefaultError = (err='Erro 400') => {

	Alert.alert(
	    'Algo deu errado',
	    err,
	    [
	      {text: 'OK', onPress: () => console.log('OK Pressed')},
	    ]
	)
}