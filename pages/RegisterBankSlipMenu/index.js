import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

import { Container, ButtonContainer, Button, ButtonText } from './styles';

export default function RegisterBankSlipMenu({ navigation }) {
  return (
    <Container>
      <Header
        title="Cadastrar Boleto"
        subtitle="Selecione uma das formas de cadastro"
      />
      {/* <ButtonContainer>
        <Button onPress={() => navigation.navigate('AutomaticCpfSearch')}>
          <ButtonText>Busca Automática por CPF</ButtonText>
        </Button>
      </ButtonContainer> */}

      <ButtonContainer>
        <Button onPress={() => navigation.navigate('BarcodeScanner')}>
          <ButtonText>Leitura Código de Barras</ButtonText>
        </Button>
      </ButtonContainer>

      {/* <ButtonContainer>
        <Button onPress={() => navigation.navigate('RegisterBankSlipForm')}>
          <ButtonText>Digitação do Código de Barras</ButtonText>
        </Button>
      </ButtonContainer> */}
    </Container>
  );
}

RegisterBankSlipMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

RegisterBankSlipMenu.navigationOptions = {
  header: null,
};
