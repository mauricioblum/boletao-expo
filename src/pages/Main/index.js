import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BankSlipsTypes } from 'store/ducks/bankslips';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import RegisterBankSlipButton from 'components/RegisterBankSlipButton';
import boleto from 'assets/images/boleto.png';
import { toCurrency } from 'utils/currency';
import { format, isThisMonth, parseISO } from 'date-fns';
import { pt } from 'date-fns/esm/locale';

import {
  Container,
  BankSlipList,
  Slip,
  Cover,
  Info,
  ValueInfo,
  Title,
  HeaderTitle,
  DueDate,
  Value,
  Status,
  SlipWrapper,
  ButtonWrapper,
  LoadingContainer,
  Empty,
  EmptyText,
} from './styles';
import { privateApi } from 'services/api';

export default function Main({ navigation }) {
  const bankslips = useSelector((state) => state.bankslips.data);
  const [slips, setSlips] = useState({
    toPay: bankslips.filter((slip) => slip.paid === false),
    paid: bankslips.filter((slip) => slip.paid === true),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const slipLoading = useSelector((state) => state.bankslips.loading);

  const currentMonth = format(Date.now(), 'MMMM', { locale: pt });

  const firstName = useMemo(() => {
    return user && user.name ? user.name.split(' ')[0] : 'Cliente!';
  }, [user]);

  async function getUserSlips() {
    await dispatch({ type: BankSlipsTypes.LOAD_REQUEST });
  }

  useEffect(() => {
    getUserSlips();
  }, []);

  useEffect(() => {
    async function getDocumentsIupay() {
      if (user) {
        try {
          const documents = await privateApi.get(
            `/dda/find-all-by-user/${user.id}`
          );

          console.log(documents.request.url);
        } catch (err) {
          console.log('error fetching documents', err);
        }
      }
    }
    getDocumentsIupay();
  }, [user]);

  function fetchSlips() {
    setSlips({
      toPay: bankslips.filter(
        (slip) => slip.paid === false && isThisMonth(parseISO(slip.dueDate))
      ),
      paid: bankslips.filter(
        (slip) => slip.paid === true && isThisMonth(parseISO(slip.dueDate))
      ),
    });
  }

  useEffect(() => {
    if (!slipLoading) {
      fetchSlips();
    }
  }, [slipLoading]);

  const getCurrentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <Container>
      <Header title={`Olá, ${firstName}`} />
      <HeaderTitle>
        boletos a vencer em {currentMonth} de {getCurrentYear}
      </HeaderTitle>
      {slipLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      ) : (
        <BankSlipList
          data={slips.toPay}
          keyExtractor={(slip) => String(slip.id)}
          renderItem={({ item: slip }) => (
            <Slip
              onPress={() =>
                navigation.navigate('BankSlipItem', {
                  slip,
                })
              }
            >
              <SlipWrapper>
                <Cover source={boleto} />
                <Info>
                  <Title>{slip.name}</Title>
                  <DueDate>{`VENCIMENTO ${format(
                    parseISO(slip.dueDate),
                    'dd/MM/yyyy'
                  )}`}</DueDate>
                </Info>
                <ValueInfo>
                  <Value>{`R$ ${toCurrency(parseFloat(slip.value))}`}</Value>
                </ValueInfo>
              </SlipWrapper>
            </Slip>
          )}
          ListEmptyComponent={
            <Empty>
              <EmptyText>
                Você ainda não tem boletos a vencer esse mês!
              </EmptyText>
            </Empty>
          }
        />
      )}
      <HeaderTitle>
        boletos pagos em {currentMonth} de {getCurrentYear}
      </HeaderTitle>
      {slipLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      ) : (
        <BankSlipList
          data={slips.paid}
          keyExtractor={(slip) => String(slip.id)}
          renderItem={({ item: slip }) => (
            <Slip
              onPress={() =>
                navigation.navigate('BankSlipItem', {
                  slip,
                })
              }
            >
              <SlipWrapper>
                <Cover source={boleto} />
                <Info>
                  <Title>{slip.name}</Title>
                  <DueDate>{`VENCIMENTO ${slip.dueDate}`}</DueDate>
                </Info>
                <ValueInfo>
                  <Value>{`R$ ${toCurrency(parseFloat(slip.value))}`}</Value>
                  <Status>PAGO</Status>
                </ValueInfo>
              </SlipWrapper>
            </Slip>
          )}
          ListEmptyComponent={
            <Empty>
              <EmptyText>Você ainda não pagou boletos esse mês!</EmptyText>
            </Empty>
          }
        />
      )}

      <ButtonWrapper>
        <RegisterBankSlipButton />
      </ButtonWrapper>
    </Container>
  );
}

Main.navigationOptions = {
  tabBarIcon: () => <Icon name="home" size={22} color="#000" />,
  tabBarLabel: 'Página Inicial',
  header: null,
};
