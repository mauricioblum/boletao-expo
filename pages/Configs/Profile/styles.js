import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const Form = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
  padding: ${metrics.basePadding}px;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 13px;

  margin-bottom: ${metrics.baseMargin}px;
  text-align: left;
  align-self: flex-start;
`;

export const Error = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};
  font-size: 15px;

  margin-bottom: ${metrics.baseMargin}px;
  text-align: center;
  align-self: flex-start;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'DIGITE',
  autoCapitalize: 'none',
  autoCorrect: false,
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

  margin-bottom: ${metrics.baseMargin}px;
`;

export const InputName = styled(Input).attrs({
  placeholder: 'DIGITE O SEU NOME',
})``;

export const InputEmail = styled(Input).attrs({
  placeholder: 'DIGITE O SEU EMAIL',
  keyboardType: 'email-address',
})``;

export const InputPhone = styled(Input).attrs({
  placeholder: 'DIGITE O SEU TELEFONE CELULAR',
  keyboardType: 'phone-pad',
})``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${colors.primary};
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
