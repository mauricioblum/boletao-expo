/* eslint-disable react/prop-types */
import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ToastAndroid, Platform, Share, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from 'expo-clipboard';
import { Overlay } from 'react-native-elements';
import { format, isToday, isPast } from 'date-fns';
import { pt } from 'date-fns/esm/locale';
import { formatTimezone } from 'utils/formatUtils';
import { IuPayBigSlipsTypes } from 'store/ducks/iupaybigslips';

import PropTypes from 'prop-types';

import { AccountDetails } from 'react-native-superdda-iupay';

import {
  ButtonView,
  SlipButton,
  SlipButtonText,
  Options,
  Option,
  OptionText,
  ModalHeader,
  ModalHeaderTitle,
  ModalContent,
  ModalTextBold,
  ModalClose,
  ModalTitle,
  ModalText,
} from './styles';

const overlayStyle = {
  position: 'absolute',
  top: 50,
  right: 30,
};

const modalStyle = {
  padding: 0,
  borderRadius: 5,
};

export const CustomButtons = ({
  bgColor,
  addSlipToBigSlip,
  isPaid,
  copyBarcodeButton,
  gotToReceiptScreen,
}) => (
  <ButtonView>
    {!isPaid ? (
      <>
        <SlipButton bgColor={bgColor} onPress={addSlipToBigSlip}>
          <SlipButtonText>Adicionar ao Boletão</SlipButtonText>
        </SlipButton>
        <SlipButton
          style={{ marginTop: 10 }}
          bgColor={bgColor}
          onPress={copyBarcodeButton}
        >
          <SlipButtonText>Copiar Código de Barras</SlipButtonText>
        </SlipButton>
      </>
    ) : (
      <SlipButton
        style={{ marginTop: 10 }}
        bgColor={bgColor}
        onPress={gotToReceiptScreen}
      >
        <SlipButtonText>Ver Comprovante</SlipButtonText>
      </SlipButton>
    )}
  </ButtonView>
);

export default function IuPaySlipDetails({ navigation, route }) {
  // const slip = navigation.getParam('slip', {});
  const slip = route.params?.slip ?? {};
  const [optionVisible, setOptionVisible] = useState(false);
  const [accountDetailsModalVisible, setAccountDetailsModalVisible] = useState(
    false
  );
  const dispatch = useDispatch();

  // const slipDueDate = formatTimezone(new Date(slip.dueDate));

  const addToBigSlip = useCallback(() => {
    // if (isToday(slipDueDate) || isPast(slipDueDate)) {
    //   Alert.alert(
    //     'Não foi possível adicionar esse Boleto ao Meu Boletão!',
    //     'Não é possível adicionar um boleto vencido ou com vencimento no dia de hoje.',
    //     [{ text: 'OK', onPress: () => {} }],
    //     { cancelable: false }
    //   );
    //   return;
    // }

    dispatch({ type: IuPayBigSlipsTypes.SAVE_IUPAY, data: slip });
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Boleto adicionado com sucesso ao Boletão',
        ToastAndroid.SHORT
      );
    }
    navigation.goBack();
  }, [dispatch]);

  const parsedAccountDates = useMemo(() => {
    const slipDate = new Date(slip.dueDate);
    return {
      short: format(slipDate, 'MMM yyyy', { locale: pt }).toUpperCase(),
      long: format(slipDate, 'dd MMM yyyy', { locale: pt }).toUpperCase(),
    };
  }, [slip.dueDate]);

  const slipValue = useMemo(() => {
    return (slip.cost / 100).toString().replace('.', ',');
  }, [slip.cost]);

  const copyToClipboard = (barcode) => {
    Clipboard.setString(barcode);

    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Código de barras copiado para a área de transferência!',
        ToastAndroid.SHORT
      );
    }
  };

  const handleShare = () => {
    Share.share({
      title: 'Detalhes da conta',
      message: `
  ${slip.issuer.name}
  Mês de referência: ${parsedAccountDates.short}
  Valor: R$ ${slipValue}
  Vencimento: ${parsedAccountDates.long}
  Código de Barras: ${slip.barcode}
    `,
    });
  };

  const baseColor =
    (slip.issuer.color && slip.issuer.color.background) || '#333';

  const handlePDF = (downloadURL) => {
    if (downloadURL) {
      Linking.openURL(downloadURL);
    } else {
      Alert.alert(
        'Não foi possível baixar o PDF',
        'Desculpe, mas nesse momento não é possível efetuar o download do PDF da conta. Tente novamente mais tarde.',
        [{ text: 'OK', onPress: () => {}, style: 'cancel' }],
        { cancelable: true }
      );
    }
  };

  return (
    <>
      <AccountDetails
        baseColor={baseColor}
        customElements={
          <CustomButtons
            addSlipToBigSlip={addToBigSlip}
            bgColor={baseColor}
            isPaid={slip.status !== 'OPENED'}
            copyBarcodeButton={() => copyToClipboard(slip.barcode)}
            gotToReceiptScreen={() =>
              navigation.navigate('ReceiptScreen', { slip })
            }
          />
        }
        data={{
          authorizedLimit: false,
          autoPayment: false,
          billDetails: {
            barCode: slip.barcode || 'Código de barras indisponível',
            billDate: slip.dueDate.substring(0, 7),
            dueDate: new Date(slip.dueDate),
            value: slip.cost / 100,
          },
          cnpj: slip.cnpj,
          companyLogo: slip.issuer.logoURL,
          companyName: slip.issuer.name,
          isAutomaticDebit: false,
          isFromIuPay: slip.processingChannel === 'DDA',
          isFromMail: slip.processingChannel === 'EMAIL',
          isUserAdded: false,
        }}
        onClickBack={() => navigation.goBack()}
        onClickCopyBarcode={() =>
          copyToClipboard(slip.barcode || 'Código de barras indisponível')
        }
        onClickOptions={() => setOptionVisible(true)}
        paymentHistoryEnabled={false}
      />
      <Overlay
        isVisible={optionVisible}
        onBackdropPress={() => setOptionVisible(false)}
        width={220}
        height={150}
        overlayStyle={overlayStyle}
      >
        <Options>
          <Option onPress={() => handlePDF(slip.downloadURL)}>
            <OptionText>PDF da conta</OptionText>
          </Option>
          <Option onPress={() => setAccountDetailsModalVisible(true)}>
            <OptionText>Ver detalhes da conta</OptionText>
          </Option>
          <Option noBorder onPress={handleShare}>
            <OptionText>Compartilhar dados da conta</OptionText>
          </Option>
        </Options>
      </Overlay>
      <Overlay
        isVisible={accountDetailsModalVisible}
        onBackdropPress={() => setAccountDetailsModalVisible(false)}
        width={360}
        height={245}
        overlayStyle={modalStyle}
      >
        <ModalHeader>
          <ModalHeaderTitle>Detalhes da conta</ModalHeaderTitle>
          <ModalClose onPress={() => setAccountDetailsModalVisible(false)}>
            <Icon name="x-circle" color="#727272" size={24} />
          </ModalClose>
        </ModalHeader>
        <ModalContent>
          <ModalTitle color={baseColor}>{slip.issuer.name}</ModalTitle>
          <ModalTextBold>{parsedAccountDates.short}</ModalTextBold>
          <ModalText>
            Valor: <ModalTextBold>R$ {slipValue}</ModalTextBold>
          </ModalText>
          <ModalText>
            Vencimento: <ModalTextBold>{parsedAccountDates.long}</ModalTextBold>
          </ModalText>
        </ModalContent>
      </Overlay>
    </>
  );
}

IuPaySlipDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

IuPaySlipDetails.navigationOptions = {
  header: null,
};
