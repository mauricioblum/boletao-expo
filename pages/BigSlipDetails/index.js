import React, { useEffect, useMemo, useState } from 'react';
import { Share } from 'react-native';
import PropTypes from 'prop-types';
import { BigSlipsTypes } from 'store/ducks/bigslips';

import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { privateApi } from 'services/api';

import {
  Container,
  Content,
  Subtitle,
  BigSlipList,
  SlipItem,
  SlipInfo,
  SlipExtraInfo,
  SlipTitle,
  SlipDescription,
  ButtonContainer,
  SlipButton,
  SlipButtonText,
  DeleteButton,
  DeleteButtonText,
} from './styles';
import { parseStringToDate } from 'utils/formatUtils';
import { toCurrency } from 'utils/currency';

export default function BigSlipDetails({ navigation }) {
  const bigslipParams = navigation.getParam('bigslip', {});
  const dispatch = useDispatch();
  const [bigslip, setBigSlip] = useState(bigslipParams);

  useEffect(() => {
    async function getBigSlipDetails() {
      try {
        const response = await privateApi.get(
          `/big-bank-slip/${bigslipParams.id}`
        );
        if (response.data) {
          console.log('bigslip data', response.data);
          setBigSlip(response.data);
        }
      } catch (err) {
        console.log('err getting bigslip details', err);
      }
    }
    getBigSlipDetails();
  }, [bigslipParams]);

  const handleDeleteBigSlip = async () => {
    try {
      dispatch({
        type: BigSlipsTypes.DELETE_BIG_SLIP_REQUEST,
        slipId: bigslip.id,
        slip: bigslip,
      });
    } catch (err) {
      console.log('error deleting', err);
    }
  };

  const handlePayCashOrCredit = async (payType) => {
    try {
      await privateApi.put(
        `/big-bank-slip/${bigslip.id}/credit-or-cash/${payType}`
      );

      if (payType === 'CREDIT') {
        navigation.navigate('BankSlipSuccess', {
          message:
            'Obrigado por solicitar crédito no Boletão! Você receberá por email todo o passo a passo necessário para dar andamento na análise e aprovação de seu crédito!',
          message2: `Lembre-se: É importante realizar todo o passo a passo enviado por email para garantir a liberação do seu crédito.
          Seus boletos somente serão pagos após a aprovação de seu crédito e pagamento do Boletão.`,
          destination: 'IuPay',
          delay: 15000,
        });
      } else {
        const share = await Share.share({
          title: 'Compartilhar código de barras',
          url: 'https://boletao.com.br',
        });
        if (share.action === Share.sharedAction) {
          navigation.navigate('BankSlipSuccess', {
            message: 'Obrigado por usar o Boletão =)',
            destination: 'IuPay',
          });
        }
      }
    } catch (err) {
      console.log('err pay cash', err);
    }
  };

  return (
    <Container>
      <Header title="Meu Boletão" type="Back" />
      <Content>
        <Subtitle>BOLETOS INCLUÍDOS NESTE BOLETÃO</Subtitle>
        <BigSlipList>
          {bigslip.bankSlips &&
            bigslip.bankSlips.map((slip) => (
              <SlipItem key={slip.id}>
                <SlipInfo>
                  <SlipTitle>{slip.name}</SlipTitle>
                  <SlipDescription>VENCIMENTO</SlipDescription>
                  <SlipDescription>
                    {parseStringToDate(slip.dueDate)}
                  </SlipDescription>
                </SlipInfo>
                <SlipTitle>R$ {toCurrency(slip.value)}</SlipTitle>
              </SlipItem>
            ))}
        </BigSlipList>

        <SlipExtraInfo>
          <SlipTitle>VALOR DO BOLETÃO</SlipTitle>
          <SlipDescription>R$ {toCurrency(bigslip.value)}</SlipDescription>
        </SlipExtraInfo>

        <SlipExtraInfo>
          <SlipTitle>VENCIMENTO DO BOLETÃO</SlipTitle>
          <SlipDescription>
            {parseStringToDate(bigslip.dueDate)}
          </SlipDescription>
        </SlipExtraInfo>

        <SlipExtraInfo>
          <SlipTitle>STATUS DO BOLETÃO</SlipTitle>
          <SlipDescription>
            {bigslip.status === 'A' ? 'ATIVO' : 'PAGO'}
          </SlipDescription>
        </SlipExtraInfo>
      </Content>
      <ButtonContainer>
        <DeleteButton onPress={handleDeleteBigSlip}>
          <DeleteButtonText>Deletar Boletão</DeleteButtonText>
        </DeleteButton>

        <SlipButton onPress={() => handlePayCashOrCredit('CASH')}>
          <SlipButtonText>Compartilhar código de barras</SlipButtonText>
        </SlipButton>

        <SlipButton onPress={() => handlePayCashOrCredit('CREDIT')}>
          <SlipButtonText>Solicitar crédito</SlipButtonText>
        </SlipButton>
      </ButtonContainer>
    </Container>
  );
}

BigSlipDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

BigSlipDetails.navigationOptions = {
  header: null,
};
