import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { publicApi } from 'services/api';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  PageHeader,
  Form,
  InputCpf,
  Button,
  ButtonText,
  Message,
  MessageError,
  Touch,
  TouchText,
} from './styles';

export default function ForgotPassword({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const { data } = await publicApi.get(
        `/profile/forgot-password?cpf=${cpf}`
      );
      // console.tron.log(cpf);
      setCpf('');
      setMessageError('');
      setMessage(data?.message);
      setLoading(false);
    } catch (err) {
      setMessage('');
      setMessageError(err?.response?.data?.message);
      console.log(err.response.data);
      setLoading(false);
    }
  }

  return (
    <Container>
      <PageHeader>Esqueceu sua senha?</PageHeader>
      <Form>
        <InputCpf value={cpf} onChangeText={(text) => setCpf(text)} />
        {!!message && <Message>{message}</Message>}
        {!!messageError && <MessageError>{messageError}</MessageError>}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Button onPress={() => handleSubmit()}>
              <ButtonText>REDEFINIR</ButtonText>
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

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ForgotPassword.navigationOptions = {
  header: null,
};
