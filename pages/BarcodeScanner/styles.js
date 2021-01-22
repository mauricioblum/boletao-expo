import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';
import { Camera as RNCamera } from 'expo-camera';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const ScannerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
  padding: 0px ${metrics.basePadding}px;
`;

export const Scanner = styled(RNCamera)`
  flex: 1;
  justify-content: space-between;
  position: relative;
  height: 800px;
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;
  letter-spacing: 0.14;
  text-align: center;
  margin-top: ${getStatusBarHeight() + 10}px;
`;

export const InputBarcode = styled.TextInput.attrs({
  placeholder: 'TOQUE PARA INSERIR O CÓDIGO DE BARRAS',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 80%;
  text-align: left;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
  letter-spacing: 0.67;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 8};
  align-items: center;
  justify-content: center;
`;

export const AlertError = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};
  letter-spacing: 1.39;
  font-size: 13px;
  margin-top: ${metrics.baseMargin};
`;

export const ButtonDisabled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${colors.gray};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 8};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 5;
`;

export const TypeWrapperTop = styled.View`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 70px;
  background-color: ${colors.background};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  color: ${colors.black};
`;

export const TypeWrapperBottom = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: ${colors.background};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TypeWrapperLeft = styled.View`
  position: absolute;
  left: 0px;
  width: 50px;
  height: 100%;
  background-color: ${colors.background};
`;

export const TypeWrapperRight = styled.View`
  position: absolute;
  right: 0px;
  width: 50px;
  height: 100%;
  background-color: ${colors.background};
`;

export const ScanButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const ScanButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  color: ${colors.mediumPurple};
`;
