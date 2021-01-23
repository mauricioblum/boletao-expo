import React from 'react';
import PropTypes from 'prop-types';
import { PaymentDetails } from 'react-native-superdda-iupay';
import { Share } from 'react-native';

export default function PaymentReceiptScreen({ navigation, route }) {
  const slip = route.params?.slip ?? {};

  const handlePayShare = () => {
    Share.share({
      title: 'Código de barras',
      message: slip.barcode.toString(),
    });
  };

  return (
    <PaymentDetails
      barCode={slip.barcode}
      baseColor={slip.issuer.color?.background || '#333'}
      beneficiaryName={slip.issuer.name}
      confirmPaymentButtonText="Pagar no meu banco"
      dueDate={slip.dueDate}
      onClickBack={() => navigation.goBack()}
      onClickViewReceipt={() => navigation.navigate('ReceiptScreen', { slip })}
      onConfirmPaymentSchedule={handlePayShare}
      type="Payment"
      isPaid={slip.status !== 'OPENED'}
      value={slip.cost / 100}
    />
  );
}

PaymentReceiptScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

PaymentReceiptScreen.navigationOptions = {
  header: null,
};
