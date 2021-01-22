import React from 'react';

import {
  Container, PageHeader, Form, InputBarcode, Button, ButtonText,
} from './styles';

export default function BarcodeForm() {
  return (
    <Container>
      <PageHeader>Digite o Código de Barras</PageHeader>
      <Form>
        <InputBarcode />
        <Button onPress={() => {}}>
          <ButtonText>CONTINUAR</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

BarcodeForm.navigationOptions = {
  header: null,
};
