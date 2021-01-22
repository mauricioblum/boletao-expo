import React, { useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BankSlipsTypes } from 'store/ducks/bankslips';

import PropTypes from 'prop-types';

import {
  Container,
  PageHeader,
  Form,
  Label,
  InputBarcode,
  InputBank,
  InputValue,
  InputValueMask,
  InputDueDate,
  InputName,
  Button,
  ButtonText,
  RecurrentCheck,
} from './styles';

export default function EditBankSlipForm({ navigation }) {
  const slip = navigation.getParam('slip', {});
  const [slipFields, setSlipFields] = useState(slip);
  const rawValue = useRef();
  const [checked, setChecked] = useState(slip.recurrent);
  const [paidChecked, setPaidChecked] = useState(slip.paid);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bankslips.loading);

  function handleInput(field, text) {
    setSlipFields({ ...slipFields, [field]: text });
  }

  function handleEditSlip() {
    dispatch({
      type: BankSlipsTypes.EDIT_REQUEST,
      slip: { ...slipFields, longValue: slipFields.value.toString() },
      recurrent: checked,
      paid: paidChecked,
    });
  }

  return (
    <Container>
      <PageHeader>Cadastrar Boleto</PageHeader>
      <Form>
        <Label>CÓDIGO DE BARRAS</Label>
        <InputBarcode value={slipFields.line} />
        <Label>BANCO</Label>
        <InputBank value={slipFields.bankName} />
        <Label>VALOR</Label>
        <InputValueMask
          ref={rawValue}
          maxLength={12}
          value={slipFields.value}
          onChangeText={(text) => handleInput('value', text)}
        />
        <Label>VENCIMENTO</Label>
        <InputDueDate value={slipFields.dueDate} />
        <Label>NOME DO BOLETO</Label>
        <InputName
          value={slipFields.name}
          onChangeText={(text) => handleInput('name', text)}
        />
        <RecurrentCheck
          title="BOLETO RECORRENTE"
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        <RecurrentCheck
          title="PAGO?"
          checked={paidChecked}
          onPress={() => setPaidChecked(!paidChecked)}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button onPress={() => handleEditSlip()}>
            <ButtonText>SALVAR</ButtonText>
          </Button>
        )}
      </Form>
    </Container>
  );
}

EditBankSlipForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

EditBankSlipForm.navigationOptions = {
  header: null,
};
