import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const RegisterSlipButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius}px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;

  font-family: 'Montserrat-SemiBold';
`;
