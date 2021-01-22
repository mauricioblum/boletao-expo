import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { parseCNPJ } from 'utils/formatUtils';

import { FilterSearch, BeneficiaryCard } from 'react-native-superdda-iupay';

import {
  Container,
  CardListView,
  MessageText,
  FixedView,
  Margin,
} from './styles';
import { privateApi } from 'services/api';
import boletoImg from 'assets/images/boleto.png';

export default function Beneficiaries({ navigation }) {
  const [refreshing, setRefreshing] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [originalBeneficiaries, setOriginalBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  const userName = useSelector((state) => state.user.data.name);

  async function getBeneficiaries() {
    setRefreshing(true);
    try {
      const response = await privateApi.get('/issuer');

      const responseSlips = [...response.data];

      setBeneficiaries(responseSlips);
    } catch (err) {
      console.log('api error', err);
    }
    setRefreshing(false);
  }

  function onRefresh() {
    getBeneficiaries();
  }

  useEffect(() => {
    getBeneficiaries();
  }, []);

  function handleClickBeneficiary(beneficiary) {
    navigation.navigate('BeneficiaryDetailsScreen', {
      beneficiary,
    });
  }

  function getBeneficiaryType(type) {
    if (type === 'energia' || type === 'telefonia') {
      return 'Account';
    }
    return 'Monthly';
  }

  useEffect(() => {
    const parsedBeneficiaries = beneficiaries.map((beneficiary) => ({
      id: beneficiary.taxId,
      name: beneficiary.name,
      activity: beneficiary.activity,
      barColor: beneficiary.color.background || '#333',
      secondaryColor: beneficiary.color.foreground,
      cardTitle: beneficiary.logoURL ? '' : beneficiary.fantasyName,
      cnpj: parseCNPJ(beneficiary.taxId),
      logo: beneficiary.logoURL || boletoImg,
      cardHolderName: beneficiary.cardHolderName || 'Nome desconhecido',
      taxId: beneficiary.taxId,
    }));
    setOriginalBeneficiaries(parsedBeneficiaries);
    setFilteredBeneficiaries(parsedBeneficiaries);
  }, [beneficiaries]);

  function handleSort(sortOrder) {
    if (sortOrder === 'asc') {
      const sorted = originalBeneficiaries.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredBeneficiaries([...sorted]);
    } else {
      const sorted = originalBeneficiaries.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setFilteredBeneficiaries([...sorted]);
    }
  }

  return (
    <FixedView>
      <Header title="Beneficiários" />
      <Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!refreshing && (
          <>
            <CardListView>
              <FilterSearch
                onClickAsc={() => handleSort('asc')}
                onClickDesc={() => handleSort('desc')}
                orderText="Ordenar por"
                searchBarEnabled={false}
              />
              {!beneficiaries.length && (
                <MessageText>Nenhum beneficiário disponível</MessageText>
              )}
              <Margin />
              {filteredBeneficiaries.map((beneficiary) => (
                <BeneficiaryCard
                  key={beneficiary.id}
                  isActive
                  barColor={beneficiary.barColor}
                  showLimitSection={false}
                  cnpj={beneficiary.cnpj}
                  cardTitle={beneficiary.cardTitle}
                  containerStyle={{ marginBottom: 10 }}
                  logo={beneficiary.logo}
                  onClickCard={() => handleClickBeneficiary(beneficiary)}
                  type={getBeneficiaryType(beneficiary.activity)}
                />
              ))}
              {/* <Text style={textStyleDescription}>
              Você tem 4 pagamentos vencendo em até <DueText>7 dias</DueText>,
              no valor total de <DueText>R$ 4.093,12</DueText>
            </Text>
            <DueText>Emitidos recentemente</DueText> */}
              {/* <CardList cards={cardsRecent} /> */}
            </CardListView>
          </>
        )}
      </Container>
    </FixedView>
  );
}

Beneficiaries.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Beneficiaries.navigationOptions = {
  tabBarIcon: () => <Icon name="money-bill" size={22} color="#000" />,
  tabBarLabel: 'Beneficiários',
};
