import React from 'react';
import { Alert, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Receipt } from 'react-native-superdda-iupay';

export default function ReceiptScreen({ navigation }) {
  const slip = navigation.getParam('slip', {});

  const handleShare = downloadURL => {
    if (downloadURL) {
      Linking.openURL(downloadURL);
    } else {
      Alert.alert(
        'Não foi possível compartilhar',
        'Desculpe, mas nesse momento não é possível compartilhar o comprovante. Tente novamente mais tarde.',
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }],
        { cancelable: true }
      );
    }
  };

  return (
    <Receipt
      authenticationCode="A.6DE.DF4.75E.DBB,128"
      barCode={slip.barcode}
      baseColor={slip.issuer.color?.background || '#333'}
      cedentName={slip.issuer.name}
      chargedValue={slip.cost / 100}
      cnpj={slip.cnpj}
      discount={0}
      dueDate={new Date(slip.dueDate)}
      fine={0}
      interest={0}
      onClickBack={() => navigation.goBack()}
      onClickOptions={() => {}}
      onClickShareReceipt={() => handleShare(slip.downloadURL)}
      paidDate={new Date()}
      value={slip.cost / 100}
    />
  );
}

ReceiptScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ReceiptScreen.navigationOptions = {
  header: null,
};
