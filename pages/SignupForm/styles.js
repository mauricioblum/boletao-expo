import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors, metrics } from 'styles';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Form = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
  padding: 0px ${metrics.basePadding * 1.5}px;
`;

export const FormKeyboardAvoiding = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.select({
    android: null,
    ios: 'padding',
  }),
  keyboardVerticalOffset: metrics.basePadding,
})`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
  padding: 0px ${metrics.basePadding * 1.5}px;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.darkgray};
  font-size: 13px;
  letter-spacing: 14px;
  margin-bottom: ${metrics.baseMargin}px;
  text-align: left;
  align-self: flex-start;
  text-transform: uppercase;
`;

export const Input = styled.TextInput.attrs({
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  returnKeyType: 'next',
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 100%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
  letter-spacing: 14px;
  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const InputCpf = styled(Input).attrs({
  placeholder: 'INSIRA O SEU CPF',
  keyboardType: 'numeric',
})``;

export const InputName = styled(Input).attrs({
  placeholder: 'INSIRA O SEU NOME',
  keyboardType: 'default',
})``;

export const InputEmail = styled(Input).attrs({
  placeholder: 'INSIRA O SEU EMAIL',
  keyboardType: 'email-address',
})``;

export const InputMobile = styled(Input).attrs({
  placeholder: 'INSIRA O SEU TELEFONE',
  keyboardType: 'numeric',
})``;

export const InputPassword = styled(Input).attrs({
  placeholder: 'INSIRA A SUA SENHA',
  keyboardType: 'default',
  autoCompleteType: 'password',
  textContentType: 'password',
  secureTextEntry: true,
})``;

export const InputConfirmPassword = styled(Input).attrs({
  placeholder: 'CONFIRME A SUA SENHA',
  keyboardType: 'default',
  autoCompleteType: 'password',
  textContentType: 'password',
  secureTextEntry: true,
  returnKeyType: 'send',
})``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 3}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 14px;
  font-family: 'Montserrat-SemiBold';
`;

export const WrapperView = styled.View`
  text-align: center;
  width: 100%;
  margin-top: ${metrics.baseMargin}px;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const LabelError = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};
  font-size: 15px;
  letter-spacing: 14px;

  text-align: center;
  align-self: flex-start;
  text-transform: uppercase;
`;
