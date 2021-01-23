import React, { useMemo, useState } from 'react';
import { Alert, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import StepHeader from '../../../components/StepHeader';
import { privateApi } from 'services/api';
import { toCurrency } from 'utils/currency';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { BankSlipsTypes } from 'store/ducks/bankslips';

import {
  Container,
  Content,
  Group,
  Label,
  LabelAlt,
  SlipName,
  SlipValue,
  SlipDueDate,
  Value,
  Button,
  AltButton,
  ButtonText,
  AltButtonText,
  SavePaymentButton,
  SavePaymentText,
  ButtonContainer,
  Divider,
  PaidIn,
  NoProof,
} from './styles';

export default function BankSlipItem({ navigation, route }) {
  const slip = route.params?.slip ?? {};
  const dispatch = useDispatch();
  const [proofImg, setProofImg] = useState('empty');
  const [showProof, setShowProof] = useState(false);
  const formattedDueDate = useMemo(
    () => format(parseISO(slip.dueDate), 'dd/MM/yyyy'),
    [slip.dueDate]
  );

  function handleDeleteSlip(id) {
    dispatch({ type: BankSlipsTypes.DELETE_REQUEST, id });
  }

  function handleEditSlip(editslip) {
    navigation.navigate('EditBankSlipForm', {
      slip: editslip,
    });
  }

  function alertDelete(slipId) {
    Alert.alert(
      'Atenção!',
      'Tem certeza que deseja remover este boleto?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => handleDeleteSlip(slipId),
        },
      ],
      { cancelable: false }
    );
  }

  async function getUserToken() {
    const token = await AsyncStorage.getItem('@Boletao:userToken');
    return token;
  }

  function blobToBase64(blob) {
    const reader = new FileReader();
    reader.onload = (r) => {
      console.tron.log(r.target.result);
      setProofImg(r.target.result);
    };
    reader.readAsDataURL(blob);
  }

  async function getToken() {
    const token = await AsyncStorage.getItem('@Boletao:userToken');
    return token;
  }

  async function downloadPaymentProof() {
    try {
      // const proof = await privateApi.get(
      //   `/bank-slip/comprovante-pagamento/${slip.id}`,
      //   {
      //     responseType: 'blob',
      //   }
      // );
      const token = await getToken();
      const url = `https://api-boletao.pvenda.com.br/bank-slip/comprovante-pagamento/${slip.id}?access_token=${token}`;
      Linking.openURL(url).catch((err) =>
        console.error('An error occurred', err)
      );

      // blobToBase64(proof.data);
      // console.tron.log(proofImg);
      // setShowProof(true);
    } catch (err) {
      if (__DEV__) console.tron.log(err);
    }
  }

  return (
    <Container>
      <StepHeader title="Seu Boleto" />
      <Content>
        <Label>BOLETO</Label>
        <SlipName>{slip.name}</SlipName>

        <SlipValue>{`R$ ${toCurrency(parseFloat(slip.value))}`}</SlipValue>
        <Divider />

        <SlipDueDate>VENCIMENTO EM {formattedDueDate}</SlipDueDate>

        {slip.paid && (
          <>
            <PaidIn>PAGO</PaidIn>
            <Group>
              <LabelAlt>COMPROVANTE DE PAGAMENTO</LabelAlt>
              {slip.paymentProofKey ? (
                <SavePaymentButton onPress={() => downloadPaymentProof()}>
                  <SavePaymentText>CLIQUE PARA SALVAR</SavePaymentText>
                </SavePaymentButton>
              ) : (
                <NoProof>Comprovante indisponível no momento</NoProof>
              )}
            </Group>
          </>
        )}
        {/* <Group>
          <Label>BOLETO RECORRENTE</Label>
          <Value>{slip.recurrent ? 'SIM' : 'NÃO'}</Value>
        </Group>

        <Group>
          <Label>STATUS</Label>
          <Value>{slip.status ? 'ATIVO' : 'INATIVO'}</Value>
        </Group> */}

        <AltButton onPress={() => alertDelete(slip.id)}>
          <AltButtonText>DELETAR BOLETO</AltButtonText>
        </AltButton>
        <Button onPress={() => handleEditSlip(slip)}>
          <ButtonText>EDITAR BOLETO</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

BankSlipItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

BankSlipItem.navigationOptions = {
  header: null,
};
