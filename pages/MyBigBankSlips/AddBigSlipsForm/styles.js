import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { CheckBox } from 'react-native-elements';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.ScrollView`
  padding: 0px ${metrics.basePadding * 1.5}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 3}px;
  margin-bottom: ${getBottomSpace()}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonDisabled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.gray};
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 3}px;
  margin-bottom: ${getBottomSpace()}px;
  align-items: center;
  justify-content: center;
`;

export const LoadingView = styled.View`
  width: 100%;
  margin-top: ${metrics.baseMargin}px;
  text-align: center;
`;

export const Error = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.danger};
  font-size: 15px;
  letter-spacing: 0.67;
  text-align: center;
  align-self: flex-start;
  text-transform: uppercase;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;

export const BankSlipList = styled.FlatList`
  padding-bottom: ${metrics.basePadding}px;
  margin-bottom: ${metrics.basePadding}px;
  max-height: ${metrics.screenHeight / 2.3}px;
`;

export const Slip = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
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

export const SlipContainer = styled.View`
  padding: 0px ${metrics.basePadding}px;
  margin-bottom: ${metrics.baseMargin}px;
  height: 58%;
  margin-top: ${metrics.baseMargin}px;
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
`;

export const CoverView = styled.View`
  margin-right: auto;
`;

export const Cover = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 22px;
  height: 22px;
`;

export const DueDate = styled.Text`
  font-size: 11px;
  letter-spacing: 0.99;
  font-family: 'Montserrat-SemiBold';
  color: #bdbdbd;
  width: 150px;
`;

export const Value = styled.Text`
  font-size: 13px;
  letter-spacing: 1.11;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-align: left;
  margin-right: ${metrics.baseMargin}px;
`;

export const Status = styled.Text`
  font-size: 11px;
  letter-spacing: 0.99;
  font-family: 'Montserrat-SemiBold';
  text-align: right;
  align-self: flex-end;
  color: #17b978;
`;

export const Info = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ValueInfo = styled.View`
  align-items: center;
  flex-direction: row;
  margin-left: auto;
`;

export const EditButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const CheckBoxSlip = styled(CheckBox).attrs({
  containerStyle: {
    padding: 0,
    margin: 0,
  },
})``;

export const Wrapper = styled.View`
  width: 100%;
`;

export const UnifiedText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 19px;
  letter-spacing: 1.46;
  text-align: center;
`;

export const UnifiedValueText = styled.Text`
  font-family: 'Montserrat-Black';
  color: ${colors.black};
  font-size: 27px;
  letter-spacing: 2.07;
  text-align: center;
  margin-top: ${metrics.baseMargin / 2}px;
  margin-bottom: ${metrics.baseMargin * 3}px;
`;
