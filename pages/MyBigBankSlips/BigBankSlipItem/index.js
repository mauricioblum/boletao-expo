import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { BigSlipsTypes } from 'store/ducks/bigslips';
import PropTypes from 'prop-types';
import StepHeader from '../../../components/StepHeader';
import { toCurrency } from 'utils/currency';
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { privateApi } from 'services/api';
import Shimmer from 'components/Shimmer';

import {
  Container,
  Content,
  Group,
  Label,
  Value,
  Button,
  AltButton,
  ButtonText,
  AltButtonText,
  SlipList,
  SlipWrapper,
  Info,
  SlipTitle,
  DueDate,
  SingleSlipValue,
  AlertError,
  DeleteView,
  DeleteText,
  Swipeaple,
  DeleteRow,
} from './styles';

export default function BigBankSlipItem({ navigation }) {
  const slipId = navigation.getParam('slipId', 0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const slipLoading = useSelector((state) => state.bigslips.loading);
  const [reqLoading, setReqLoading] = useState(false);
  const [slip, setSlip] = useState({
    name: '',
    bankSlips: [],
    paid: false,
    status: '',
    value: '',
    dueDate: '',
  });

  async function fetchBigSlip() {
    try {
      setLoading(true);
      const bigSlip = await privateApi.get(`/big-bank-slip/${slipId}`);

      setSlip(bigSlip.data);
      console.tron.log(bigSlip.data);
      setLoading(false);
    } catch (err) {
      // console.tron.log(err);
      setLoading(false);
    }
  }

  async function deleteBigSlip() {
    try {
      setReqLoading(true);
      await privateApi.delete(`/big-bank-slip/${slipId}`);
      const today = Date.now();
      dispatch({
        type: BigSlipsTypes.LOAD_BIG_FILTER_REQUEST,
        month: format(today, 'MM'),
        year: format(today, 'yyyy'),
      });
      navigation.goBack();
      setReqLoading(false);
    } catch (err) {
      // console.tron.log(err);
      setReqLoading(false);
    }
  }

  function handleAddSlips(bigslip) {
    navigation.navigate('AddBigSlipsForm', {
      bigslip,
    });
  }

  function handleRemoveSlip(id) {
    Alert.alert(
      'Remover Boleto',
      'Deseja remover este boleto do Boletão?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remover',
          onPress: () =>
            dispatch({
              type: BigSlipsTypes.REMOVE_BIG_SLIP_REQUEST,
              bigslip: slip,
              slipId: id,
            }),
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    fetchBigSlip();
  }, []);

  return (
    <Container>
      <StepHeader title="Meu Boletão" />
      <Content>
        <Shimmer loading={loading}>
          <Group>
            <Label>BOLETOS INCLUÍDOS ESTE BOLETÃO</Label>
            {!slipLoading ? (
              <SlipList
                data={slip.bankSlips}
                ListEmptyComponent={<AlertError>Boletão vazio!</AlertError>}
                keyExtractor={(singleSlip) => String(singleSlip.id)}
                renderItem={({ item: singleSlip }) => (
                  <Swipeaple
                    disableRightSwipe
                    friction={12}
                    stopLeftSwipe={85}
                    rightOpenValue={-95}
                  >
                    <DeleteView>
                      <DeleteRow
                        onPress={() => handleRemoveSlip(singleSlip.id)}
                      >
                        <DeleteText>Remover</DeleteText>
                      </DeleteRow>
                    </DeleteView>
                    <SlipWrapper>
                      <Info>
                        <SlipTitle>{singleSlip.name}</SlipTitle>
                        <DueDate>{`VENCIMENTO ${format(
                          parseISO(singleSlip.dueDate),
                          'dd/MM/yyyy'
                        )}`}</DueDate>
                      </Info>
                      <SingleSlipValue>{`R$ ${toCurrency(
                        parseFloat(singleSlip.value)
                      )}`}</SingleSlipValue>
                    </SlipWrapper>
                  </Swipeaple>
                )}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </Group>

          <Group>
            <Label>VALOR DO BOLETÃO</Label>
            <Value>{`R$${toCurrency(parseFloat(slip.value))}`}</Value>
          </Group>

          <Group>
            <Label>VENCIMENTO DO BOLETÃO</Label>
            <Value>
              {slip.dueDate && format(parseISO(slip.dueDate), 'dd/MM/yyyy')}
            </Value>
          </Group>

          <Group>
            <Label>STATUS DO BOLETÃO</Label>
            <Value>{slip.status ? 'ATIVO' : 'INATIVO'}</Value>
          </Group>

          {/* <Group>
          <Label>COMPROVANTE DE PAGAMENTO</Label>
          <SavePaymentButton>
            <SavePaymentText>CLIQUE PARA SALVAR</SavePaymentText>
          </SavePaymentButton>
        </Group> */}
          {!reqLoading ? (
            <>
              <AltButton onPress={() => deleteBigSlip()}>
                <AltButtonText>DELETAR BOLETÃO</AltButtonText>
              </AltButton>
              <Button onPress={() => handleAddSlips(slip)}>
                <ButtonText>ADICIONAR BOLETOS</ButtonText>
              </Button>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Shimmer>
      </Content>
    </Container>
  );
}

BigBankSlipItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

BigBankSlipItem.navigationOptions = {
  header: null,
};
