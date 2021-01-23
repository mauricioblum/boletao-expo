import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ButtonContainer, RegisterSlipButton, ButtonText } from './styles';

export default function RegisterBankSlipButton() {
  const { navigate } = useNavigation();

  return (
    // menu -> RegisterBankSlipMenu
    // scanner -> BarcodeScanner
    <ButtonContainer>
      <RegisterSlipButton onPress={() => navigate('BarcodeScanner')}>
        <ButtonText>CADASTRAR BOLETO</ButtonText>
      </RegisterSlipButton>
    </ButtonContainer>
  );
}
