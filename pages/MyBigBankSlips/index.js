import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import MonthSlider from 'components/MonthSlider';
import Header from '../../components/Header';
import { toCurrency } from 'utils/currency';
import Icon from 'react-native-vector-icons/Ionicons';
import { isBefore, subDays, isWeekend } from 'date-fns';
import { CardList } from 'react-native-superdda-iupay';

import {
  Container,
  HeaderTitle,
  UnifiedText,
  UnifiedValueText,
  Button,
  ButtonText,
  CardListView,
  BigSlipCountText,
  BigSlipCountTextBold,
  BigSlipCard,
  Bar,
  BigSlipCardContent,
  BetweenRow,
  BigCardTitle,
  BigCardInfo,
  BigCardDate,
  BigCardValue,
} from './styles';
import { parseStringToDate, parseDate } from 'utils/formatUtils';

export default function MyBigBankSlips({ navigation }) {
  const dispatch = useDispatch();
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const currentMonthBigSlips = useSelector(
    (state) => state.bigslips.filteredData
  );
  const iupaybigslips = useSelector((state) => state.iupaybigslips.data);

  const formattedBigSlips = useMemo(() => {
    return iupaybigslips.map((slip) => ({
      ...slip,
      value: slip.cost / 100,
      logo: slip.issuer.logoURL,
      dueDate: parseDate(slip.dueDate),
      isPaid: slip.status !== 'OPENED',
      barColor: slip.issuer.color.background || '#333',
      onCardClick: () => {},
    }));
  }, [iupaybigslips]);

  const totalUnifiedValue = useMemo(() => {
    let value = 0;
    formattedBigSlips.forEach((slip) => {
      value += slip.value;
    });
    return value;
  }, [formattedBigSlips]);

  const pivotDate = useMemo(() => {
    let pivot = new Date(2050, 12, 12);
    if (!formattedBigSlips.length) {
      return new Date();
    }
    formattedBigSlips.forEach((slip) => {
      if (isBefore(slip.dueDate, pivot)) {
        pivot = slip.dueDate;
      }
    });
    let returnedPivotDate = subDays(pivot, 1);

    while (isWeekend(returnedPivotDate)) {
      returnedPivotDate -= subDays(pivot, 1);
    }

    return returnedPivotDate;
  }, [formattedBigSlips]);

  return (
    <Container>
      <Header title="Meu Boletão" />
      <MonthSlider
        big
        onMonthSelect={(month) => setIsCurrentMonth(!!month.current)}
      />
      <CardListView>
        {isCurrentMonth &&
          (!iupaybigslips.length ? (
            <HeaderTitle>Nenhum boleto cadastrado</HeaderTitle>
          ) : (
            <>
              <BigSlipCountText>
                Você tem {iupaybigslips.length} boletos adicionados ao{' '}
                <BigSlipCountTextBold>Meu Boletão</BigSlipCountTextBold> no
                valor total de{' '}
                <BigSlipCountTextBold>{`R$ ${toCurrency(
                  totalUnifiedValue
                )}`}</BigSlipCountTextBold>
                .
              </BigSlipCountText>
              <CardList cards={formattedBigSlips} />
              <Button
                onPress={() => {
                  navigation.navigate('UnifiedPaymentMethod', {
                    unifiedValue: totalUnifiedValue,
                    dueDay: pivotDate.getDate(),
                    dueMonth: pivotDate.getMonth() + 1,
                    dueYear: pivotDate.getFullYear(),
                    slips: formattedBigSlips.map((slip) => slip.id + 1),
                  });
                }}
              >
                <ButtonText>Criar Boletão</ButtonText>
              </Button>
            </>
          ))}

        <UnifiedText>VALOR TOTAL UNIFICADO</UnifiedText>
        <UnifiedValueText>{`R$${toCurrency(
          totalUnifiedValue
        )}`}</UnifiedValueText>

        <HeaderTitle>Confira aqui seus boletões cadastrados</HeaderTitle>
        {currentMonthBigSlips.map((slip) => (
          <BigSlipCard
            key={slip.id}
            onPress={() => {
              navigation.navigate('BigSlipDetails', { bigslip: slip });
            }}
          >
            <Bar />
            <BigSlipCardContent>
              <BetweenRow>
                <BigCardTitle>{slip.name}</BigCardTitle>
                <BigCardInfo>
                  <BigCardDate>{parseStringToDate(slip.dueDate)}</BigCardDate>
                  <BigCardValue>R$ {toCurrency(slip.value)}</BigCardValue>
                </BigCardInfo>
              </BetweenRow>
            </BigSlipCardContent>
          </BigSlipCard>
        ))}
      </CardListView>
    </Container>
  );
}

MyBigBankSlips.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

MyBigBankSlips.navigationOptions = {
  tabBarIcon: () => <Icon name="ios-barcode" size={26} color="#000" />,
  tabBarLabel: 'Meu Boletão',
};
