import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { privateApi } from 'services/api';
import StepHeader from '../../../components/StepHeader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container, Form, Input, Button, ButtonText } from './styles';

export default function Help({ navigation }) {
  const [helpText, setHelpText] = useState('');
  const [loading, setLoading] = useState(false);
  const username = useSelector((state) => state.user.data.name.split(' ')[0]);

  function alertMessage() {
    Alert.alert(
      'Mensagem Enviada!',
      'Obrigado por entrar em contato conosco! Responderemos em breve',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  }

  async function handleSendForm() {
    try {
      setLoading(true);
      await privateApi.post(`/profile/send-message?message=${helpText}`);
      setLoading(false);
      alertMessage();
    } catch (err) {
      // console.tron.log(err);
      setLoading(false);
    }
  }

  return (
    <Container>
      <StepHeader
        title="Ajuda"
        subtitle={`Olá ${username}, qual a sua dúvida?`}
      />
      <Form>
        <Input value={helpText} onChangeText={(text) => setHelpText(text)} />
        {!loading ? (
          <Button onPress={() => handleSendForm()}>
            <ButtonText>ENVIAR</ButtonText>
          </Button>
        ) : (
          <ActivityIndicator />
        )}
      </Form>
    </Container>
  );
}

Help.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Help.navigationOptions = {
  header: null,
};
