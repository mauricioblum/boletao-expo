import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  color: ${colors.black};

  text-align: center;
  max-width: 330px;
  margin-top: ${metrics.baseMargin * 2}px;
`;
