import styled from 'styled-components/native';
import { colors, metrics } from 'styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})`
  padding: 0px ${metrics.basePadding}px;
  margin-top: ${metrics.baseMargin * 2}px;
  text-align: center;
`;

export const Group = styled.View`
  margin-top: ${metrics.baseMargin * 4}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${metrics.baseMargin * 4}px;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: ${colors.black};
`;

export const PaidIn = styled.Text`
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: #17b978;
  color: #17b978;
  font-family: 'Montserrat-ExtraBold';
  text-align: center;
  font-size: 12px;
  padding: 7px 20px;
  margin-top: ${metrics.baseMargin}px;
`;

export const LabelAlt = styled.Text`
  font-family: 'Montserrat-ExtraBold';
  font-size: 13px;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  color: #0b182a;
`;

export const SlipName = styled.Text`
  font-family: 'Montserrat-ExtraBold';
  font-size: 34px;
  font-style: normal;

  text-align: center;
  color: ${colors.black};
`;

export const SlipValue = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 23px;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  color: ${colors.black};
`;

export const Divider = styled.View`
  width: 220px;
  margin: ${metrics.baseMargin}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.altgray};
`;

export const SlipDueDate = styled.Text`
  font-family: 'Montserrat-ExtraBold';
  font-size: 14px;
  font-style: normal;
  text-align: center;
  color: ${colors.black};
`;

export const Value = styled.Text`
  color: ${colors.altgray};
  font-size: 11px;
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-bottom: ${getBottomSpace() + 10}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 289px;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius}px;
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
  font-family: 'Montserrat-ExtraBold';
  text-align: center;
  font-size: 12px;
`;

export const NoProof = styled.Text`
  color: ${colors.danger};
  font-family: 'Montserrat-ExtraBold';
  text-align: center;
  font-size: 12px;
`;

export const AltButtonText = styled(ButtonText)`
  color: #3c3ef5;
  font-family: 'Montserrat-ExtraBold';
`;

export const SavePaymentButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const SavePaymentText = styled.Text`
  color: #3c3ef5;
  font-size: 13px;
`;
