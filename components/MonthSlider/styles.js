import styled from 'styled-components/native';
import { colors, metrics } from 'styles';

export const WrappedView = styled.View`
  height: auto;
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
  background-color: ${(props) =>
    props.selected ? colors.secretPurple : colors.white};
  border-radius: ${metrics.baseRadius}px;
  margin-left: ${metrics.baseMargin + 5}px;
  height: 51px;
  width: 75px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(202, 202, 202, 0.5);
`;

export const CurrentMonth = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: #5055f5;
  border-radius: ${metrics.baseRadius}px;
  margin-left: ${metrics.baseMargin + 5}px;
  height: 51px;
  width: 75px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(202, 202, 202, 0.5);
`;

export const Title = styled.Text`
  color: ${(props) => (props.white ? colors.white : colors.black)};
  font-family: 'Montserrat-ExtraBold';
  font-size: 18px;
  text-align: center;
`;

export const ActualMonth = styled.Text`
  color: ${colors.white};
  font-family: 'Montserrat-ExtraBold';
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
`;
