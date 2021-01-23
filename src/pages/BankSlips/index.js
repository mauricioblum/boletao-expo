import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BankSlipsTypes } from 'store/ducks/bankslips';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import RegisterBankSlipButton from 'components/RegisterBankSlipButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import boleto from 'assets/images/boleto.png';
import { format, parseISO } from 'date-fns';

import { toCurrency } from 'utils/currency';
import * as Animatable from 'react-native-animatable';

import {
  FixedView,
  Container,
  HeaderTitle,
  BankSlipList,
  Slip,
  SlipWrapper,
  CoverView,
  Cover,
  Info,
  SlipTitle,
  DueDate,
  ValueInfo,
  Value,
  EditButton,
  CheckBoxSlip,
  SlipContainer,
  UnifiedText,
  UnifiedValueText,
  UnifyButton,
  UnifiyButtonText,
  DummyView,
  Wrapper,
  WrapperView,
  LoadingView,
} from './styles';
import { ButtonContainer } from '../Main/styles';
import MonthSlider from 'components/MonthSlider';

export default function BankSlips({ navigation }) {
  const [selectedSlips, setSelectedSlips] = useState([]);
  const [unifiedValue, setUnifiedValue] = useState(0);
  const bankslips = useSelector((state) => state.bankslips.data);
  const filteredSlips = useSelector((state) => state.bankslips.filteredData);
  const [monthSlips, setMonthSlips] = useState(bankslips);
  const slipLoading = useSelector((state) => state.bankslips.loading);
  const dispatch = useDispatch();

  function selectSlip(id) {
    const slips = [...selectedSlips];
    const currentSlip = selectedSlips.find((slip) => slip === id);
    const slipValue = filteredSlips.find((slip) => slip.id === id).value;
    const parsedValue = parseFloat(slipValue);
    if (!currentSlip) {
      slips.push(id);
      setSelectedSlips(slips);
      setUnifiedValue(parsedValue + unifiedValue);
    } else {
      setSelectedSlips(slips.filter((slip) => slip !== id));
      setUnifiedValue(unifiedValue - parsedValue);
    }
  }

  useEffect(() => {
    if (selectedSlips.length) {
      let newValue = 0;
      selectedSlips.forEach((id) => {
        newValue += bankslips.find((slip) => slip.id === id).value;
      });
      setUnifiedValue(newValue);
    }
  }, [bankslips]);

  function isSelected(id) {
    const selected = selectedSlips.find((slip) => slip === id);
    if (!selected) {
      return false;
    }
    return true;
  }

  function handleEditSlip(slip) {
    navigation.navigate('BankSlipItem', {
      slip,
    });
  }

  useEffect(() => {
    const month = format(Date.now(), 'MM');
    const year = format(Date.now(), 'yyyy');
    dispatch({ type: BankSlipsTypes.LOAD_FILTER_REQUEST, month, year });
  }, []);

  useEffect(() => {
    setMonthSlips(filteredSlips);
  }, [filteredSlips]);

  function beginUnifiedProcess() {
    setSelectedSlips([]);
    setUnifiedValue(0);
    navigation.navigate('UnifiedPayment', {
      unifiedValue,
      slips: selectedSlips,
    });
  }

  return (
    <FixedView>
      <Container>
        <Header title="Boletos" />
        <MonthSlider />
        <SlipContainer>
          {monthSlips.length === 0 ? (
            <>
              <HeaderTitle>
                Nenhum boleto disponível no mês selecionado
              </HeaderTitle>
              <DummyView />
            </>
          ) : (
            <HeaderTitle>
              Selecione os Boletos que deseja adicionar ao seu Boletão ou
              cadastre um novo boleto
            </HeaderTitle>
          )}
          {!slipLoading ? (
            <BankSlipList
              data={monthSlips}
              refreshing={slipLoading}
              shouldResize={selectedSlips.length > 0}
              keyExtractor={(slip) => String(slip.id)}
              renderItem={({ item: slip }) => (
                <Slip>
                  <SlipWrapper>
                    <CheckBoxSlip
                      center
                      checked={isSelected(slip.id)}
                      onPress={() => selectSlip(slip.id)}
                    />
                    <CoverView>
                      <Cover source={boleto} />
                    </CoverView>
                    <Info>
                      <SlipTitle>{slip.name}</SlipTitle>
                      <DueDate>{`VENCIMENTO ${format(
                        parseISO(slip.dueDate),
                        'dd/MM/yyyy'
                      )}`}</DueDate>
                    </Info>
                    <ValueInfo>
                      <Value>{`R$ ${toCurrency(
                        parseFloat(slip.value)
                      )}`}</Value>
                      <EditButton onPress={() => handleEditSlip(slip)}>
                        <Icon name="pencil-alt" size={22} color="#000" />
                      </EditButton>
                    </ValueInfo>
                  </SlipWrapper>
                </Slip>
              )}
            />
          ) : (
            <LoadingView>
              <ActivityIndicator size="large" />
            </LoadingView>
          )}
        </SlipContainer>
      </Container>
      {selectedSlips.length > 0 ? (
        <Animatable.View animation="slideInUp">
          <Wrapper>
            <UnifiedText>VALOR TOTAL UNIFICADO</UnifiedText>
            <UnifiedValueText>{`R$${toCurrency(
              unifiedValue
            )}`}</UnifiedValueText>
            <ButtonContainer>
              <UnifyButton onPress={() => beginUnifiedProcess()}>
                <UnifiyButtonText>ADICIONAR AO MEU BOLETÃO</UnifiyButtonText>
              </UnifyButton>
            </ButtonContainer>
          </Wrapper>
        </Animatable.View>
      ) : (
        <></>
      )}
      <WrapperView>
        <RegisterBankSlipButton />
      </WrapperView>
    </FixedView>
  );
}

BankSlips.navigationOptions = {
  tabBarIcon: () => <Icon name="file-invoice" size={22} color="#000" />,
  tabBarLabel: 'Boletos',
};

BankSlips.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
