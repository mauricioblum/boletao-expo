import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Container, Message } from './styles';

export default function BankSlipSuccess({ navigation }) {
  const defaultDelay = 5000;
  const message = navigation.getParam(
    'message',
    'Boleto cadastrado com sucesso!'
  );
  const message2 = navigation.getParam('message2', '');
  const destination = navigation.getParam('destination', 'IuPay');
  const delay = navigation.getParam('delay', defaultDelay);

  useEffect(() => {
    setTimeout(() => navigation.navigate(destination), delay);
  });

  return (
    <Container>
      <Icon name="money-check" color="#000" size={35} />
      <Message>{message}</Message>
      <Message>{message2}</Message>
    </Container>
  );
}

BankSlipSuccess.navigationOptions = {
  header: null,
};

BankSlipSuccess.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
