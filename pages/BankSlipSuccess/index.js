import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Container, Message } from './styles';

export default function BankSlipSuccess({ navigation, route }) {
  const defaultDelay = 5000;

  const message = route.params?.message ?? '';
  const message2 = route.params?.message2 ?? '';
  const destination = route.params?.destination ?? 'IuPay';
  const delay = route.params?.delay ?? defaultDelay;

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
