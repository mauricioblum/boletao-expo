import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  padding: 0px ${metrics.basePadding - 3}px;
`;

export const BankSlipList = styled.FlatList`
  max-height: 300px;
  padding-bottom: ${metrics.basePadding}px;
  margin-bottom: ${metrics.basePadding}px;
`;

export const Slip = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;
  padding: 5px ${metrics.basePadding}px;
`;

export const Cover = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 22px;
  height: 22px;
`;

export const Info = styled.View`
  margin-left: ${metrics.baseMargin * 3}px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ValueInfo = styled.View`
  margin-left: ${metrics.baseMargin * 4}px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const SlipWrapper = styled.View.attrs({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: '#333',
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${metrics.basePadding}px 0px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipseMode: 'tail',
})`
  font-size: 13px;
  max-width: 140px;

  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
`;

export const HeaderTitle = styled.Text`
  font-size: 13px;

  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
  margin-left: ${metrics.baseMargin * 2}px;
`;

export const Empty = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;

  font-family: 'Montserrat-SemiBold';
  color: #bdbdbd;
  text-align: center;
`;

export const DueDate = styled.Text`
  font-size: 11px;
  font-family: 'Montserrat-SemiBold';
  color: #bdbdbd;
`;

export const Value = styled.Text`
  font-size: 13px;

  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-align: left;
`;

export const Status = styled.Text`
  font-size: 11px;
  font-family: 'Montserrat-SemiBold';
  text-align: right;
  align-self: flex-end;
  color: #17b978;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${metrics.baseMargin * 4}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 80%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius}px;
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

export const LoadingContainer = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
