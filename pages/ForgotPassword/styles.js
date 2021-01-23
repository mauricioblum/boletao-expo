import styled from 'styled-components/native';
import { Animated } from 'react-native';

import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;

  text-align: center;
  margin-top: ${getStatusBarHeight() + 10}px;
`;

export const Form = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputCpf = styled.TextInput.attrs({
  placeholder: 'INSIRA SEU CPF',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 80%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;

  margin-bottom: ${metrics.baseMargin}px;
`;

export const InputPass = styled.TextInput.attrs({
  placeholder: 'INSIRA SUA NOVA SENHA',
  autoCapitalize: 'none',
  autoCorrect: false,
  secureTextEntry: true,
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 80%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;

  margin-bottom: ${metrics.baseMargin}px;
`;

export const InputConfirmPass = styled(InputPass).attrs({
  placeholder: 'CONFIRME SUA NOVA SENHA',
})``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${(props) =>
    props.disabled ? colors.gray : colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 8}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;

  font-family: 'Montserrat-SemiBold';
`;

export const Touch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-top: 20px;
`;

export const TouchText = styled.Text`
  color: ${colors.primary};
  text-align: center;
  font-size: 13px;

  font-family: 'Montserrat-SemiBold';
`;

export const Message = styled.Text`
  color: ${colors.success};
  text-align: center;
  font-size: 16px;

  font-family: 'Montserrat-SemiBold';
  margin-bottom: ${metrics.baseMargin}px;
`;

export const MessageError = styled.Text`
  color: ${colors.danger};
  text-align: center;
  font-size: 16px;

  font-family: 'Montserrat-SemiBold';
  margin-bottom: ${metrics.baseMargin}px;
`;
