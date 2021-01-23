import styled from 'styled-components/native';
import { colors, metrics } from 'styles';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px ${metrics.basePadding - 3}px;
`;

export const UnifiedText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 19px;
  text-align: center;
`;

export const UnifiedLabel = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.altgray};
  font-size: 13px;
  letter-spacing: 14px;
  text-align: center;
`;

export const UnifiedValueText = styled.Text`
  font-family: 'Montserrat-Black';
  color: ${colors.black};
  font-size: 27px;
  letter-spacing: 12px;
  text-align: center;
  margin-top: ${metrics.baseMargin / 2}px;
  margin-bottom: ${metrics.baseMargin * 3}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius}px;
  height: 60px;
  margin-top: ${metrics.baseMargin * 4}px;
  margin-bottom: ${metrics.baseMargin * 2};
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

export const LoadingContainer = styled.View`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
