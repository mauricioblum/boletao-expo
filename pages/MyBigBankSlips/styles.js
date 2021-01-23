import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';
import { CheckBox } from 'react-native-elements';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.View`
  padding: 0px ${metrics.basePadding}px;
`;

export const SlipScrollView = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: 'center',
  },
  showsHorizontalScrollIndicator: false,
})``;

export const Month = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius * 3 - 3}px;
  padding: ${metrics.basePadding * 2}px;
  margin-left: ${metrics.baseMargin + 5}px;
  height: 110px;
  box-shadow: 0px 2px 5px rgba(202, 202, 202, 0.5);
  z-index: 5;
`;

export const CurrentMonth = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius * 3 - 3}px;
  padding: ${metrics.basePadding * 2}px;
  margin-left: ${metrics.baseMargin + 5}px;
  height: 135px;
  box-shadow: 0px 2px 5px rgba(202, 202, 202, 0.5);
  z-index: 5;
`;

export const Title = styled.Text`
  color: ${colors.black};
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  letter-spacing: 12px;
  text-align: center;
`;

export const ActualMonth = styled.Text`
  color: #464646;
  font-family: 'Montserrat-Medium';
  font-size: 12px;
  text-align: center;
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const HeaderTitle = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
  text-align: center;
  margin-top: ${metrics.baseMargin * 2}px;
  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const BankSlipList = styled.FlatList`
  padding-bottom: ${metrics.basePadding}px;
  margin-bottom: ${metrics.basePadding}px;
  /* max-height: ${(props) =>
    props.shouldResize
      ? `${metrics.screenHeight * 0.15}`
      : `${metrics.screenHeight * 0.2}`}px; */
`;

export const DummyView = styled.View`
  /* height: ${(props) =>
    props.shouldResize
      ? `${metrics.screenHeight * 0.25}`
      : `${metrics.screenHeight * 0.4}`}px; */
`;

export const Slip = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Cover = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 22px;
  height: 22px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ValueInfo = styled.View`
  margin-left: ${metrics.baseMargin}px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

export const SlipWrapper = styled.TouchableOpacity.attrs({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: '#333',
  activeOpacity: 0.6,
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${metrics.basePadding}px 0px;
`;

export const SlipContainer = styled.View`
  padding: 0px ${metrics.basePadding}px;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const SlipTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipseMode: 'tail',
})`
  font-size: 13px;
  letter-spacing: 14px;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
  width: 150px;
`;

export const DueDate = styled.Text`
  font-size: 11px;

  font-family: 'Montserrat-SemiBold';
  color: #bdbdbd;
  width: 150px;
`;

export const Value = styled.Text`
  font-size: 13px;
  letter-spacing: 14px;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-align: left;
  margin-right: ${metrics.baseMargin}px;
`;

export const EditButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const Status = styled.Text`
  font-size: 11px;

  font-family: 'Montserrat-SemiBold';
  text-align: right;
  align-self: flex-end;
  color: #17b978;
`;

export const CheckBoxSlip = styled(CheckBox).attrs({
  containerStyle: {
    padding: 0,
    margin: 0,
  },
})``;

export const UnifiedText = styled.Text`
  font-size: 19px;
  font-family: 'Montserrat-SemiBold';
  text-align: center;
  color: ${colors.black};
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const UnifiedValueText = styled.Text`
  font-size: 27px;
  letter-spacing: 12px;
  font-family: 'Montserrat-SemiBold';
  text-align: center;
  color: ${colors.black};
  margin-top: ${metrics.baseMargin}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${getBottomSpace()}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 14px;
  font-family: 'Montserrat-SemiBold';
`;

export const LoadingContainer = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardListView = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-bottom: 9px;
  margin-top: 13px;
`;

export const BigSlipCountText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${colors.black};
  margin-bottom: 20px;
`;

export const BigSlipCountTextBold = styled(BigSlipCountText)`
  font-family: 'Montserrat-Bold';
`;

export const BigSlipCard = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  flex-direction: row;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  margin-bottom: 2px;
`;

export const Bar = styled.View`
  width: 8px;
  height: auto;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: #5056f6;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
`;

export const BigSlipCardContent = styled.View`
  flex: 1;
  padding: 15px;
`;

export const BetweenRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  min-height: 18px;
`;

export const BigCardTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  text-transform: uppercase;
  color: #000;
`;

export const BigCardInfo = styled.View``;

export const BigCardDate = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 11px;
  line-height: 20px;
  text-align: right;
  color: #000000;
`;

export const BigCardValue = styled(BigCardDate)`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
`;
