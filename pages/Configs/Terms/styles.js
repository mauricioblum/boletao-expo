import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const Content = styled.ScrollView`
  max-height: 90%;
  padding: ${metrics.basePadding}px;
`;

export const Text = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 13px;
  letter-spacing: 0;
  text-align: left;
  align-self: flex-start;
  margin-bottom: ${metrics.baseMargin}px;
`;
