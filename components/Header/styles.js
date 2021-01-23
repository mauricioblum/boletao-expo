import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: ${getStatusBarHeight() + 10}px;
  margin-bottom: ${metrics.baseMargin}px;
  padding: 0 ${metrics.basePadding}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SubtitleContainer = styled.View`
  flex-direction: column;
`;

export const Title = styled.Text`
  color: ${colors.black};
  font-family: 'Montserrat-Black';
  font-size: 24px;
  letter-spacing: 1px;
`;

export const Subtitle = styled.Text`
  color: ${colors.altgray};
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
  letter-spacing: 12px;
  margin-top: ${metrics.baseMargin / 2}px;
`;
