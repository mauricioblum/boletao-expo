import styled from 'styled-components/native';
import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.select({
    android: null,
    ios: 'padding',
  }),
  keyboardVerticalOffset: metrics.basePadding,
})`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: ${getStatusBarHeight}px;
`;

export const Logo = styled.Image`
  width: 159px;
  height: 123px;
  margin-bottom: ${metrics.baseMargin * 4}px;
`;

export const Title = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};

  text-transform: uppercase;
  font-size: 15px;
`;

export const AlertError = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};

  font-size: 13px;
  margin-top: ${metrics.baseMargin}px;
`;

export const TitleLine = styled.View`
  background-color: #494bf5;
  width: 13px;
  height: 5px;
  border-radius: 3px;
  margin-top: ${metrics.baseMargin}px;
  margin-bottom: ${metrics.baseMargin * 6}px;
`;

export const InputCpf = styled.TextInput.attrs({
  placeholder: 'INSIRA SEU CPF',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
  returnKeyType: 'next',
  maxLength: 11,
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius}px;
  width: 80%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
`;

export const InputPassword = styled.TextInput.attrs({
  placeholder: 'INSIRA SUA SENHA',
  autoCapitalize: 'none',
  autoCorrect: false,
  autoCompleteType: 'password',
  textContentType: 'password',
  secureTextEntry: true,
})`
  border: 1px solid ${colors.purple};
  height: 60px;
  border-radius: ${metrics.baseRadius}px;
  width: 80%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.secundary};
  box-shadow: 0px 2px 10px rgba(30, 0, 233, 0.26);
  color: ${colors.darkPurple};
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;

  margin-top: ${metrics.baseMargin * 2}px;
`;

export const LoginButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius}px;
  height: 60px;
  margin-top: ${metrics.baseMargin * 8}px;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  width: 100%;
  height: 60px;
  margin-top: ${metrics.baseMargin * 8}px;
  align-items: center;
  justify-content: center;
`;

export const Touch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const LoginButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;

  font-family: 'Montserrat-SemiBold';
`;

export const ForgotForm = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin * 2.5}px;
`;

export const ForgotText = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.gray};
  text-align: center;
  font-size: 11px;

  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const SignupText = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.mediumPurple};
  text-transform: uppercase;
  text-align: center;
  font-size: 11px;
`;
