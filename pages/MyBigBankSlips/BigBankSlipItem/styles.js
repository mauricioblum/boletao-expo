import styled from 'styled-components/native';
import { colors, metrics } from 'styles';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.ScrollView`
  padding: 0px ${metrics.basePadding * 2}px;
`;

export const Group = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 13px;
  letter-spacing: 1.11;
`;

export const Value = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.altgray};
  font-size: 11px;
  letter-spacing: 0.99;
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 2};
  align-items: center;
  justify-content: center;
`;

export const AltButton = styled(Button)`
  background-color: ${colors.background};
  border: 1px solid #3f40f0;
  margin-top: ${metrics.baseMargin * 2}px;
  box-shadow: none;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;

export const AltButtonText = styled(ButtonText)`
  color: #3f40f0;
`;

export const SavePaymentButton = styled.TouchableOpacity``;

export const SavePaymentText = styled.Text`
  font-family: 'Montserrat-Medium';
  color: #3f40f0;
  font-size: 13px;
  letter-spacing: 1.11;
`;

export const DeleteView = styled.View`
  background-color: ${colors.danger};
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 15px;
  align-items: center;
`;

export const DeleteRow = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const DeleteText = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.white};
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.11;
`;

export const SlipList = styled(SwipeListView)`
  padding-bottom: ${metrics.basePadding}px;
  margin-bottom: ${metrics.basePadding}px;
  max-height: ${(props) =>
    props.shouldResize
      ? `${metrics.screenHeight * 0.15}`
      : `${metrics.screenHeight * 0.2}`}px;
`;

export const SlipWrapper = styled.View.attrs({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: '#333',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.background};
  padding: ${metrics.basePadding}px 0px;
`;

export const Swipeaple = styled(SwipeRow)``;

export const Info = styled.View`
  display: flex;
  flex-direction: column;
`;

export const SlipTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipseMode: 'tail',
})`
  font-size: 13px;
  letter-spacing: 1.11;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
  width: 150px;
`;

export const DueDate = styled.Text`
  font-size: 11px;
  letter-spacing: 0.99;
  font-family: 'Montserrat-SemiBold';
  color: #bdbdbd;
  width: 150px;
`;

export const AlertError = styled.Text`
  font-size: 15px;
  letter-spacing: 0.99;
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};
`;

export const SingleSlipValue = styled.Text`
  font-size: 13px;
  letter-spacing: 1.11;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-align: left;
  margin-right: ${metrics.baseMargin}px;
`;

export const Placeholder = styled.View`
  width: 100%;
`;
