import React, { useState } from 'react';
import { privateApi } from 'services/api';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { BigSlipsTypes } from 'store/ducks/bigslips';
import { BankSlipsTypes } from 'store/ducks/bankslips';
import { IuPayBigSlipsTypes } from 'store/ducks/iupaybigslips';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import StepHeader from '../../components/StepHeader';
import { toCurrency } from 'utils/currency';
import { parseStringToDate } from 'utils/formatUtils';

import {
  Container,
  Content,
  UnifiedText,
  UnifiedValueText,
  UnifiedLabel,
  Button,
  ButtonText,
  LoadingContainer,
} from './styles';

export default function UnifiedPaymentMethod({ navigation }) {
  const unifiedValue = navigation.getParam('unifiedValue', 0);
  const dueDay = navigation.getParam('dueDay', 0);
  const dueMonth = navigation.getParam('dueMonth', 0);
  const dueYear = navigation.getParam('dueYear', 2020);
  const selectedSlips = navigation.getParam('slips', []);
  const [loading, setLoading] = useState(false);
  // const loading = useSelector(state => state.bigslips.loading);
  const dispatch = useDispatch();

  const formattedDueDate = `${dueYear}-${String(dueMonth).padStart(
    2,
    '0'
  )}-${String(dueDay).padStart(2, '0')}`;

  const bigslipData = {
    banksSlipsId: selectedSlips,
    dueDate: formattedDueDate,
    name: `Boletão ${formattedDueDate}`,
    paid: false,
  };

  async function createBigSlip() {
    try {
      setLoading(true);
      await privateApi.post('/big-bank-slip', bigslipData);
      // console.tron.log(response.data);
      const today = Date.now();
      dispatch({
        type: BigSlipsTypes.LOAD_BIG_FILTER_REQUEST,
        month: format(today, 'MM'),
        year: format(today, 'yyyy'),
      });
      dispatch({
        type: BankSlipsTypes.LOAD_FILTER_REQUEST,
        month: format(today, 'MM'),
        year: format(today, 'yyyy'),
      });
      navigation.navigate('BankSlipSuccess', {
        message: 'Seu Boletão gerado com sucesso!',
        message2: `Você irá receber o boleto para pagamento no seu email. Lembre-se que a data de vencimento do seu Boletão será ${parseStringToDate(
          bigslipData.dueDate
        )}`,
        destination: 'MyBigBankSlips',
      });
      dispatch({
        type: IuPayBigSlipsTypes.CLEAR_IUPAY,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      // console.tron.log(err);
    }
  }

  return (
    <Container>
      <StepHeader
        title="Unificação de Pagamento"
        subtitle="Selecione o método de pagamento"
      />
      <Content>
        <UnifiedText>VALOR TOTAL UNIFICADO</UnifiedText>
        <UnifiedLabel>
          {`VENCIMENTO: ${dueDay} DE ${format(
            new Date(2021, dueMonth - 1, 11, 55, 0),
            'MMMM',
            {
              locale: pt,
            }
          ).toUpperCase()}`}
        </UnifiedLabel>
        <UnifiedValueText>{`R$${toCurrency(unifiedValue)}`}</UnifiedValueText>
        {!loading ? (
          <Button onPress={() => createBigSlip()}>
            <ButtonText>PAGAR COM BOLETÃO</ButtonText>
          </Button>
        ) : (
          <LoadingContainer>
            <ActivityIndicator size={35} color="#8880ff" />
          </LoadingContainer>
        )}
      </Content>
    </Container>
  );
}

UnifiedPaymentMethod.navigationOptions = {
  header: null,
};

UnifiedPaymentMethod.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
