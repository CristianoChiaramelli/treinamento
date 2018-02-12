import { AUTH_URL } from './globals';

export const FetchLogin = (email, password) => {
    fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    })
  }).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.err){
        
        return responseJson.err;

      } else if(!responseJson.name){

        return null;

      } else {
        const user = {
          id: responseJson.id,
          name: responseJson.name,
          email: email,
        }

        return user;
        // this.props.setLogged(user);
        // this.props.navigation.navigate('InsidePage');
      }
  })
  .catch((err) => {
    return err;
  })
}