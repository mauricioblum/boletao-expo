import React from 'react';

import {
  Container,
  PageHeader,
  Form,
  InputCpf,
  Button,
  ButtonText,
  AddCpf,
  AddCpfText,
} from './styles';

export default function AutomaticCpfSearch() {
  return (
    <Container>
      <PageHeader>Busca Automática por CPF</PageHeader>
      <Form>
        <InputCpf />
        <AddCpf onPress={() => {}}>
          <AddCpfText>Clique aqui para cadastrar mais de um CPF</AddCpfText>
        </AddCpf>
        <Button onPress={() => {}}>
          <ButtonText>CONTINUAR</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

AutomaticCpfSearch.navigationOptions = {
  header: null,
};
