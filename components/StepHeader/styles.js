import styled from 'styled-components/native';
import { colors, metrics } from 'styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Container = styled.View`
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
  flex-direction: column;
  margin-top: ${getStatusBarHeight() + 10}px;
  margin-left: ${metrics.baseMargin}px;
  margin-right: ${metrics.baseMargin}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;
  letter-spacing: 0.14;
  text-align: center;
`;

export const HeaderSubTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.altgray};
  font-size: 13px;
  letter-spacing: 1.11;
`;

export const HeaderIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;
