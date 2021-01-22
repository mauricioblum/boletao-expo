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

export const Input = styled.TextInput.attrs({
  placeholder: 'Digite aqui sua dúvida',
  autoCorrect: true,
  multiline: true,
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 100%;
  height: 400px;
  text-align: left;
  padding: 10px 20px;
  background-color: ${colors.background};
  box-shadow: 1px 1px 10px lightgrey;
  color: ${colors.black};
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

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;
