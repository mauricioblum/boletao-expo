import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const Container = styled.ScrollView`
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-ExtraBold';
  color: ${colors.black};
  font-size: 23px;
  padding-left: ${metrics.basePadding}px;
`;

export const PageSubtitle = styled(PageHeader)`
  font-family: 'Montserrat-Bold';
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CardListView = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-bottom: 9px;
  margin-top: 13px;
`;

export const Divider = styled.View`
  margin-top: ${(props) => props.spacingTop || '1px'};
`;

export const DueText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #000000;
  margin-bottom: 13px;
`;

export const MonthsView = styled.View`
  margin-bottom: 11px;
`;

export const IuPayIcon = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.5;
`;

export const MessageText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 18px;
  color: #777;
  text-align: center;
  margin-top: 26px;
`;

export const FixedView = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Margin = styled.View`
  margin-bottom: 10px;
`;
