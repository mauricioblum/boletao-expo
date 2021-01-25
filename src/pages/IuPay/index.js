import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { RefreshControl, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isSameMonth, isToday, isBefore, isAfter, subDays } from 'date-fns';
import MonthSlider from 'components/MonthSlider';
import Header from '../../components/Header';

import { toCurrency } from 'utils/currency';
import { FeaturedCard, CardList } from 'react-native-superdda-iupay';
import { parseCNPJ, parseValue, parseDate } from 'utils/formatUtils';

import {
  Container,
  PageSubtitle,
  MonthsView,
  CardListView,
  FeaturedCardListView,
  SlipText,
  MessageText,
  FixedView,
  DescriptionText,
  DueText,
} from './styles';
import { privateApi } from 'services/api';

const dateSeven = new Date();
dateSeven.setDate(dateSeven.getDate() + 7);

export default function IuPay({ navigation }) {
  const isMountedRef = useRef(null);
  const [refreshing, setRefreshing] = useState(true);
  const [iuPaySlips, setIuPaySlips] = useState([]);
  const [
    iuPaySevenDaysSlipsTotalValue,
    setIuPaySevenDaysSlipsTotalValue,
  ] = useState(0);
  const [parsedSlips, setParsedSlips] = useState([]);
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const [filteredIuPaySlips, setFilteredIuPaySlips] = useState([]);
  const userName = useSelector((state) => state.user.data.name.split(' ')[0]);

  function handleClickSlip(slip) {
    navigation.navigate('IuPaySlipDetails', {
      slip,
    });
  }

  async function getIuPaySlips(isRefresh) {
    setRefreshing(true);
    try {
      const response = await privateApi.get('/dda/find-all/period');

      const responseSlips = [...response.data];

      setIuPaySlips(responseSlips);
      const parsed = responseSlips
        .map((slip) => ({
          id: slip.id,
          barColor:
            (slip.issuer.color && slip.issuer.color?.background) || '#333',
          barCode: slip.barcode || 'Código de barras indisponível',
          cnpj: parseCNPJ(slip.issuer.taxId),
          cardTitle: slip.issuer.logoURL ? '' : slip.issuer.name,
          dueDate: parseDate(slip.dueDate),
          isPaid: slip.status !== 'OPENED',
          logo: slip.issuer.logoURL || 'https://i.imgur.com/TuNBR5z.png',
          onCardClick: () =>
            handleClickSlip({
              ...slip,
              cnpj: parseCNPJ(slip.issuer.taxId),
            }),
          value: parseValue(slip.cost),
          isFromMail: slip.processingChannel === 'EMAIL',
          downloadURL: slip.downloadURL,
        }))
        .filter((slip) => slip.value > 0);
      setParsedSlips([...parsed]);
      if (!isRefresh && isMountedRef.current) {
        const filteredSlips = parsed.filter((slip) =>
          isSameMonth(new Date(), slip.dueDate)
        );
        setFilteredIuPaySlips(filteredSlips);
      }
    } catch (err) {
      console.log('error fetching slips', JSON.stringify(err));
    }
    setRefreshing(false);
  }

  function onRefresh() {
    getIuPaySlips(true);
  }

  useEffect(() => {
    isMountedRef.current = true;

    getIuPaySlips(false);
    return () => (isMountedRef.current = false);
  }, []);

  const featuredSlips = useMemo(() => {
    return filteredIuPaySlips.filter((slip) => isToday(slip.dueDate));
  }, [filteredIuPaySlips]);

  const handleClickFeaturedSlip = (featured) => {
    const slipToClick = iuPaySlips.find((slip) => slip.id === featured.id);

    if (slipToClick) handleClickSlip(slipToClick);
  };

  const handleSelectMonth = (month) => {
    if (month.current === true) {
      setIsCurrentMonth(true);
    } else {
      setIsCurrentMonth(false);
    }

    const parsedMonth = month.month.split('-');

    const filteredSlips = parsedSlips.filter((slip) =>
      isSameMonth(
        new Date(parsedMonth[0], parsedMonth[1] - 1, 25, 15, 0),
        slip.dueDate
      )
    );
    setFilteredIuPaySlips(filteredSlips);
  };

  const expiredSlips = useMemo(() => {
    const yesterday = subDays(new Date(), 1);
    return filteredIuPaySlips.filter((slip) =>
      isBefore(slip.dueDate, yesterday)
    );
  }, [filteredIuPaySlips]);

  const getIuPaySlipsTotalValue = (IuPaySlips) => {
    let totalValue = 0;
    IuPaySlips.forEach((slip) => {
      totalValue += slip.value;
    });
    return totalValue;
  };

  const sevenDaysSlips = useMemo(() => {
    const sevenDaysIuPaySlips = filteredIuPaySlips
      .filter((slip) => isBefore(slip.dueDate, dateSeven))
      .filter((slip) => {
        return (
          featuredSlips.indexOf(slip) === -1 &&
          expiredSlips.indexOf(slip) === -1
        );
      });
    setIuPaySevenDaysSlipsTotalValue(
      getIuPaySlipsTotalValue(sevenDaysIuPaySlips)
    );
    return sevenDaysIuPaySlips;
  }, [filteredIuPaySlips]);

  const recentlySlips = useMemo(() => {
    return filteredIuPaySlips
      .filter((slip) => isAfter(slip.dueDate, dateSeven))
      .filter((slip) => {
        return featuredSlips.indexOf(slip) === -1;
      });
  }, [filteredIuPaySlips]);

  return (
    <FixedView>
      <Header title="Boletos" />
      <Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PageSubtitle>Olá, {userName}!</PageSubtitle>
        <MonthsView>
          <MonthSlider
            custom
            key={'iupay month slider'}
            onMonthSelect={(month) => handleSelectMonth(month)}
          />
        </MonthsView>
        {!refreshing && isCurrentMonth === true ? (
          <>
            {featuredSlips.length === 1 && (
              <FeaturedCard
                logo={featuredSlips[0].logo}
                textColor="#727272"
                barColor={featuredSlips[0].barColor}
                cnpj={featuredSlips[0].cnpj || <Text />}
                dueDate={featuredSlips[0].dueDate}
                isFromMail={featuredSlips[0].isFromMail}
                value={featuredSlips[0].value}
                featuredBgColor="#5056f6"
                onClickCard={() => handleClickFeaturedSlip(featuredSlips[0])}
                isPaid={featuredSlips[0].isPaid}
                isDue
              />
            )}
            {featuredSlips.length > 1 && (
              <FeaturedCardListView>
                <CardList
                  cards={featuredSlips}
                  featured
                  featuredBackgroundColor="#5056f6"
                  showTotal
                  totalPaymentText="Valor total dos pagamentos que vencem hoje"
                  totalPaymentTextStyle={{
                    textAlign: 'center',
                  }}
                />
              </FeaturedCardListView>
            )}
            <CardListView>
              {sevenDaysSlips.length > 0 && (
                <>
                  <SlipText>Vencendo em até 7 dias</SlipText>
                  <CardList cards={sevenDaysSlips} />
                  {sevenDaysSlips.length === 1 ? (
                    <DescriptionText>
                      Você tem {sevenDaysSlips.length} pagamento vencendo em até
                      <DueText> 7 dias</DueText>, no valor total de
                      <DueText>
                        {' '}
                        R${' '}
                        {toCurrency(parseFloat(iuPaySevenDaysSlipsTotalValue))}
                      </DueText>
                    </DescriptionText>
                  ) : (
                    <DescriptionText>
                      Você tem {sevenDaysSlips.length} pagamentos vencendo em
                      até
                      <DueText> 7 dias</DueText>, no valor total de
                      <DueText>
                        {' '}
                        R${' '}
                        {toCurrency(parseFloat(iuPaySevenDaysSlipsTotalValue))}
                      </DueText>
                    </DescriptionText>
                  )}
                </>
              )}
              {recentlySlips.length > 0 && (
                <>
                  <SlipText>Emitidos recentemente</SlipText>
                  <CardList cards={recentlySlips} />
                </>
              )}
              {expiredSlips.length > 0 && (
                <>
                  <SlipText>Outros Pagamentos</SlipText>
                  <CardList cards={expiredSlips} />
                </>
              )}
            </CardListView>
          </>
        ) : (
          <CardListView>
            {filteredIuPaySlips.length > 0 ? (
              <>
                <CardList cards={filteredIuPaySlips} />
              </>
            ) : (
              <MessageText>
                Nenhum boleto cadastrado no mês selecionado
              </MessageText>
            )}
          </CardListView>
        )}
      </Container>
    </FixedView>
  );
}

IuPay.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

IuPay.navigationOptions = {
  tabBarIcon: () => <FontAwesome5 name="file-invoice" size={22} color="#000" />,
  tabBarLabel: 'Boletos',
};
