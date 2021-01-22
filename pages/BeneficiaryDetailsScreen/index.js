import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { parseValue } from 'utils/formatUtils';

import { BeneficiaryDetails } from 'react-native-superdda-iupay';

import PropTypes from 'prop-types';

import { Container } from './styles';
import { privateApi } from 'services/api';

export default function BeneficiaryDetailsScreen({ navigation }) {
  const beneficiary = navigation.getParam('beneficiary', {});
  const [refreshing, setRefreshing] = useState(true);
  const [beneficiaryPaymentHistory, setBeneficiaryPaymentHistory] = useState(
    []
  );

  async function getBeneficiaryPaymentHistory() {
    setRefreshing(true);
    try {
      const response = await privateApi.get(
        `/issuer/historic?taxId=${beneficiary.taxId}`
      );
      setBeneficiaryPaymentHistory(response.data);
    } catch (err) {
      console.log('api error', err);
    }
    setRefreshing(false);
  }

  function onRefresh() {
    getBeneficiaryPaymentHistory();
  }

  useEffect(() => {
    getBeneficiaryPaymentHistory();
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BeneficiaryDetails
        baseColor={beneficiary.barColor}
        cardHolderOpenText="Acessar conta"
        showCardHolderNameOnModal={false}
        data={{
          cnpj: beneficiary.cnpj,
          companyLogo: beneficiary.logo,
          companyName: beneficiary.name,
          cardHolderName: beneficiary.cardHolderName,
          isFromIuPay: false,
          isFromMail: true,
          isUserAdded: false,
          beneficiaryDetails: {},
          paymentHistory: beneficiaryPaymentHistory.map((payment) => ({
            date: payment.date,
            value: parseValue(payment.value),
            isOpen: payment.isOpen,
          })),
        }}
        onClickBack={() => navigation.goBack()}
        onClickOptions={() => console.log('view')}
        onClickViewBeneficiaryDetails={() => console.log('view')}
        onClickViewCard={() => console.log('view')}
      />
    </Container>
  );
}

BeneficiaryDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

BeneficiaryDetailsScreen.navigationOptions = {
  header: null,
};
