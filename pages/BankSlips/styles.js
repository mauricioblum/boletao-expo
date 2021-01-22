import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';
import { CheckBox } from 'react-native-elements';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const FixedView = styled.View`
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
  height: 100%;
`;

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const WrapperView = styled.View`
  width: 100%;
  padding: 0px ${metrics.basePadding}px;
`;

export const LoadingView = styled.View`
  width: 100%;
  margin-top: ${metrics.baseMargin}px;
`;

export const SlipScrollView = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: 'center',
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'column',
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
  letter-spacing: 2.04;
  text-align: center;
`;

export const ActualMonth = styled.Text`
  color: #464646;
  font-family: 'Montserrat-Medium';
  font-size: 12px;
  letter-spacing: 1.02;
  text-align: center;
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const HeaderTitle = styled.Text`
  font-size: 12px;
  letter-spacing: 1;
  font-family: 'Montserrat-SemiBold';
  color: #0b182a;
  text-transform: uppercase;
  text-align: center;
`;

export const BankSlipList = styled.FlatList`
  padding-bottom: ${metrics.basePadding}px;
  margin-bottom: ${metrics.basePadding}px;
  /* max-height: ${(props) =>
    props.shouldResize
      ? `${metrics.screenHeight * 0.25}`
      : `${metrics.screenHeight * 0.4}`}px; */
  flex: 1;
`;

export const DummyView = styled.View`
  /* height: ${(props) =>
    props.shouldResize
      ? `${metrics.screenHeight * 0.25}`
      : `${metrics.screenHeight * 0.4}`}px; */
  flex: 1;
`;

export const Slip = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const CoverView = styled.View`
  /* position: absolute;
  left: 45; */
  /* flex: 1; */
  margin-right: auto;
`;

export const Cover = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 22px;
  height: 22px;
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
  flex: 1;
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

export const EditButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const Status = styled.Text`
  font-size: 11px;
  letter-spacing: 0.99;
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

export const Wrapper = styled.View`
  width: 100%;
  height: 25%;
  padding: 0px ${metrics.basePadding}px;
`;

export const UnifiedText = styled.Text`
  font-size: 19px;
  letter-spacing: 1.46;
  font-family: 'Montserrat-SemiBold';
  text-align: center;
  color: ${colors.black};
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const UnifiedValueText = styled.Text`
  font-size: 27px;
  letter-spacing: 2.07;
  font-family: 'Montserrat-SemiBold';
  text-align: center;
  color: ${colors.black};
  margin-top: ${metrics.baseMargin}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const UnifyButton = styled.TouchableOpacity.attrs({
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

export const UnifiyButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;
