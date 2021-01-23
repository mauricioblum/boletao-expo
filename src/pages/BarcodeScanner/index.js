import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Camera as RNCamera } from 'expo-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { BarCodeScanner } from 'expo-barcode-scanner';
import StepHeader from '../../components/StepHeader';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
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

  async function lockToLandscapeLeft() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  async function lockToPortrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }

  async function handleBarcode(data) {
    setBarcodeData(data.data);
    await lockToPortrait();
    setEnableCamera(false);
  }

  async function openCamera() {
    await lockToLandscapeLeft();
    setEnableCamera(true);
  }

  async function closeCamera() {
    console.log('close camera!');
    await lockToPortrait();
    setEnableCamera(false);
  }

  async function goToReadBarcode() {
    await lockToPortrait();
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
  const [type, setType] = useState(RNCamera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await RNCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    openCamera();
  }, []);

  if (hasPermission === null) {
    return (
      <View>
        <Text>Please enable camera permission</Text>
      </View>
    );
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
          onBarCodeScanned={(data) => handleBarcode(data)}
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
            <FontAwesome5 name="times" size={35} color="#000" />
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
