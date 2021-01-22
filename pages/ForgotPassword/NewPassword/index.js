import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { publicApi } from 'services/api';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  PageHeader,
  Form,
  InputPass,
  InputConfirmPass,
  Button,
  ButtonText,
  Message,
  MessageError,
  Touch,
  TouchText,
} from '../styles';

export default function NewPassword({ navigation }) {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = navigation.getParam('token', 'null');

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await publicApi.put('/profile/reset-password', {
        confirmation: confirmPass,
        newPassword: pass,
        token,
      });
      // console.tron.log(cpf);
      setMessage(response.data);
      navigation.navigate('Login');
    } catch (err) {
      setMessageError(err.message);
      // console.tron.log(err);
    }
    setLoading(false);
  }

  function handleCheck() {
    if (pass !== confirmPass) {
      setMessageError('As senhas devem ser iguais!');
    } else {
      setMessageError('');
      handleSubmit();
    }
  }

  return (
    <Container>
      <PageHeader>Redefinir sua senha</PageHeader>
      <Form>
        <InputPass value={pass} onChangeText={(text) => setPass(text)} />
        <InputConfirmPass
          value={confirmPass}
          onChangeText={(text) => setConfirmPass(text)}
        />
        {!!message && <Message>{message}</Message>}
        {!!messageError && <MessageError>{messageError}</MessageError>}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Button onPress={() => handleCheck()}>
              <ButtonText>REDEFINIR SENHA</ButtonText>
            </Button>
            <Touch onPress={() => navigation.navigate('Login')}>
              <TouchText>VOLTAR</TouchText>
            </Touch>
          </>
        )}
      </Form>
    </Container>
  );
}

NewPassword.navigationOptions = {
  header: null,
};

NewPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
