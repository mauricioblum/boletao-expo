import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import StepHeader from '../../../components/StepHeader';
import { toCurrency } from 'utils/currency';

import {
  Container,
  Content,
  BankSlipList,
  Slip,
  SlipWrapper,
  CheckBoxSlip,
  Info,
  SlipTitle,
  DueDate,
  Value,
  ValueInfo,
  LoadingView,
  Button,
  ButtonText,
  ButtonDisabled,
  Error,
  UnifiedText,
  UnifiedValueText,
} from './styles';
import { BigSlipsTypes } from 'store/ducks/bigslips';

export default function AddBigSlipsForm({ navigation }) {
  const bigslip = navigation.getParam('bigslip', {});
  const bankslips = useSelector((state) => state.bankslips);
  const bigslipsState = useSelector((state) => state.bigslips);
  const [selectedSlips, setSelectedSlips] = useState([]);
  const [unifiedValue, setUnifiedValue] = useState(bigslip.value);

  const dispatch = useDispatch();

  function selectSlip(id) {
    const slips = selectedSlips;
    const currentSlip = selectedSlips.find((slip) => slip === id);
    const slipValue = bankslips.data.find((slip) => slip.id === id).value;
    const parsedValue = parseFloat(slipValue);

    if (currentSlip == null) {
      slips.push(id);
      setSelectedSlips(slips);
      setUnifiedValue((value) => parsedValue + value);
    } else {
      setSelectedSlips(slips.filter((slip) => slip !== id));
      setUnifiedValue((value) => value - parsedValue);
    }
  }

  function isSelected(id) {
    const selected = selectedSlips.find((slip) => slip === id);
    if (selected == null) {
      return false;
    }
    return true;
  }

  function handleAddSlips() {
    dispatch({
      type: BigSlipsTypes.EDIT_BIG_SLIP_REQUEST,
      bigslip,
      slips: selectedSlips,
    });
  }

  const iff = (condition, then, otherwise) => (condition ? then : otherwise);

  return (
    <Container>
      <StepHeader
        title="Adicionar Boletos"
        subtitle="Selecione os boletos a serem adicionados a este Boletão"
      />
      <Content>
        {!bankslips.loading ? (
          <>
            <BankSlipList
              data={bankslips.data}
              refreshing={bankslips.loading}
              shouldResize={false}
              ListEmptyComponent={
                <LoadingView>
                  <Error>Não existem boletos disponíveis</Error>
                </LoadingView>
              }
              keyExtractor={(slip) => String(slip.id)}
              renderItem={({ item: slip }) => (
                <Slip>
                  <SlipWrapper>
                    <CheckBoxSlip
                      center
                      checked={isSelected(slip.id)}
                      onPress={() => selectSlip(slip.id)}
                    />
                    <Info>
                      <SlipTitle>{slip.name}</SlipTitle>
                      <DueDate>{`VENCIMENTO ${slip.dueDate}`}</DueDate>
                    </Info>
                    <ValueInfo>
                      <Value>{`R$ ${toCurrency(
                        parseFloat(slip.value)
                      )}`}</Value>
                    </ValueInfo>
                  </SlipWrapper>
                </Slip>
              )}
            />
            <UnifiedText>Valor Unificado Atual</UnifiedText>
            <UnifiedValueText>{`R$${toCurrency(
              bigslip.value
            )}`}</UnifiedValueText>
            <UnifiedText>Novo Valor Unificado</UnifiedText>
            <UnifiedValueText>{`R$${toCurrency(
              unifiedValue
            )}`}</UnifiedValueText>
          </>
        ) : (
          <LoadingView>
            <ActivityIndicator size="large" />
          </LoadingView>
        )}
        {!bigslipsState.loading ? (
          iff(
            selectedSlips.length > 0,
            <Button onPress={() => handleAddSlips()}>
              <ButtonText>ADICIONAR SELECIONADOS</ButtonText>
            </Button>,
            <ButtonDisabled onPress={() => {}}>
              <ButtonText>ADICIONAR SELECIONADOS</ButtonText>
            </ButtonDisabled>
          )
        ) : (
          <LoadingView>
            <ActivityIndicator size="large" />
          </LoadingView>
        )}
        {!!bigslipsState.error && <Error>{bigslipsState.error}</Error>}
      </Content>
    </Container>
  );
}

AddBigSlipsForm.navigationOptions = {
  header: null,
};

AddBigSlipsForm.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
