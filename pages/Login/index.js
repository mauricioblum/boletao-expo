import React, { useState, useRef } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { UserTypes } from 'store/ducks/user';
// import PropTypes from 'prop-types';

import { publicApi, privateApi } from 'services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Form,
  Logo,
  Title,
  TitleLine,
  InputCpf,
  InputPassword,
  LoginButton,
  LoadingContainer,
  LoginButtonText,
  ForgotForm,
  ForgotText,
  SignupText,
  Touch,
  AlertError,
} from './styles';

import boletaoLogo from '../../assets/images/splash.png';

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [userCpf, setUserCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const inputPassword = useRef(null);

  const dispatch = useDispatch();

  async function handleLogin() {
    setLoading(true);
    Keyboard.dismiss();
    const basicAuth = 'Basic Y2xpZW50aWQ6bWFpbmFwcHNlY3JldA==';
    const config = { headers: { Authorization: basicAuth } };
    try {
      const response = await publicApi.post(
        `/oauth/token?username=${userCpf}&password=${password}&grant_type=password`,
        {},
        config
      );
      AsyncStorage.setItem('@Boletao:userToken', response.data.access_token);
      dispatch({ type: UserTypes.GET_USER_REQUEST });
      const user = await privateApi.get('/profile/me');
      await AsyncStorage.setItem(
        '@Boletao:userDetails',
        JSON.stringify(user.data)
      );

      navigation.navigate('User');

      setLoading(false);

      const userDetails = await AsyncStorage.getItem('@Boletao:userDetails');
      // console.tron.log(userDetails);
    } catch (err) {
      // (err.response.data);
      setError(err.response.data.error && 'CPF ou senha inválido(s) !');
      setLoading(false);
    }
  }

  function handleNextInput(text) {
    setUserCpf(text);
    if (text.length === 11) {
      inputPassword.current.focus();
    }
  }

  return (
    <Container>
      <Form>
        <Logo source={boletaoLogo} />
        <Title>LOG IN</Title>
        <TitleLine />
        <InputCpf onChangeText={(text) => handleNextInput(text)} />
        <InputPassword
          ref={inputPassword}
          onChangeText={(text) => setPassword(text)}
        />
        {!!error && <AlertError>{error}</AlertError>}
        {!loading ? (
          <LoginButton onPress={() => handleLogin()}>
            <LoginButtonText>ENTRAR</LoginButtonText>
          </LoginButton>
        ) : (
          <LoadingContainer>
            <ActivityIndicator size={35} color="#8880ff" />
          </LoadingContainer>
        )}
        <ForgotForm>
          <Touch onPress={() => navigation.navigate('ForgotPassword')}>
            <ForgotText>ESQUECEU SUA SENHA?</ForgotText>
          </Touch>
          <Touch onPress={() => navigation.navigate('SignupForm')}>
            <SignupText>Você ainda não tem uma conta?</SignupText>
          </Touch>
        </ForgotForm>
      </Form>
    </Container>
  );
}

// Login.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

Login.navigationOptions = {
  header: null,
};
