import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Camera as RNCamera } from 'expo-camera';
import BarcodeMask from 'react-native-barcode-mask';
import StepHeader from '../../components/StepHeader';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
// import Orientation from 'react-native-orientation-locker';
import { privateApi } from 'services/api';
// import { BankslipParser } from './slipParser';

import {
  Container,
  ScannerContainer,
  Scanner,
  InputBarcode,
  Button,
  ButtonText,
  ButtonDisabled,
  CloseButton,
  TypeWrapperTop,
  TypeWrapperBottom,
  TypeWrapperLeft,
  TypeWrapperRight,
  ScanButton,
  ScanButtonText,
  Title,
  AlertError,
} from './styles';

export default function BarcodeScanner({ navigation }) {
  const [barcodeData, setBarcodeData] = useState('');
  const barcodeScanner = useRef(null);
  const [enableCamera, setEnableCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleBarcode(data) {
    setBarcodeData(data.data);
    // Orientation.lockToPortrait();
    setEnableCamera(false);
  }

  function openCamera() {
    // Orientation.lockToLandscapeLeft();
    setEnableCamera(true);
  }

  function closeCamera() {
    // Orientation.lockToPortrait();
    setEnableCamera(false);
  }

  function goToReadBarcode() {
    // Orientation.lockToPortrait();
    setEnableCamera(false);
    // navigation.navigate('BarcodeForm');
  }

  function parseSlip(text) {
    const slipText = text.replace(/\./g, '').replace(/ /g, '');
    setBarcodeData(slipText);
  }

  async function handleReadSlip() {
    setLoading(true);
    try {
      const response = await privateApi.get(
        `/bank-slip/scanner?line=${barcodeData}`
      );
      // console.tron.log(response.data);
      setError(null);
      setLoading(false);
      navigation.navigate('RegisterBankSlipForm', {
        barcodeLine: barcodeData,
      });
    } catch (err) {
      // console.tron.log(err);
      console.log('barcode scan error', err);
      setError(err.data.message);
      setLoading(false);
    }
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    openCamera();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {enableCamera ? (
        <Scanner
          ref={barcodeScanner}
          type={RNCamera.Constants.Type.back}
          zoom={0}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          onBarCodeScanned={(type, data) => handleBarcode(data)}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.interleaved2of5,
            ],
          }}
        >
          <BarcodeMask
            width={700}
            animatedLineColor="#F00"
            lineAnimationDuration={3000}
          />
          <CloseButton onPress={() => closeCamera()}>
            <FontAwesome5 name="close" size={35} color="#000" />
          </CloseButton>
          <TypeWrapperTop>
            <Title>ESCANEIE O CÓDIGO DE BARRAS DO BOLETO</Title>
          </TypeWrapperTop>
          <TypeWrapperBottom>
            <ScanButton onPress={() => goToReadBarcode()}>
              <ScanButtonText>
                INSERIR CÓDIGO DO BOLETO MANUALMENTE
              </ScanButtonText>
            </ScanButton>
          </TypeWrapperBottom>
          <TypeWrapperLeft />
          <TypeWrapperRight />
        </Scanner>
      ) : (
        <Container>
          <StepHeader title="Leia o Código de Barras" />
          <ScannerContainer>
            <InputBarcode
              editable
              value={barcodeData}
              onChangeText={(text) => parseSlip(text)}
              // onTouchEnd={() => openCamera()}
            />
            {error && <AlertError>{error}</AlertError>}
            {loading && <ActivityIndicator size={35} color="#8880ff" />}
            {barcodeData.length >= 44 && !loading ? (
              <Button onPress={() => handleReadSlip()}>
                <ButtonText>CONTINUAR</ButtonText>
              </Button>
            ) : (
              <ButtonDisabled onPress={() => {}}>
                <ButtonText>CONTINUAR</ButtonText>
              </ButtonDisabled>
            )}
          </ScannerContainer>
        </Container>
      )}
    </>
  );
}

BarcodeScanner.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

BarcodeScanner.navigationOptions = {
  header: null,
};
