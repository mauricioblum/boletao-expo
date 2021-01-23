import styled from 'styled-components/native';
import AnimatedFlatlist from 'react-native-animated-flatlist';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';
import Icon from 'react-native-vector-icons/Ionicons';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;
  letter-spacing: 1px;
  text-align: left;
  margin-top: ${getStatusBarHeight() + 10}px;
  padding-left: ${metrics.basePadding}px;
`;

export const NotificationContent = styled.ScrollView.attrs({})`
  flex-direction: column;
  padding: ${metrics.basePadding}px;
`;

export const DayTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.darkgray};
  font-size: 13px;
  letter-spacing: 14px;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const NotificationList = styled(FlatList)``;

export const NotificationCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius}px;
  box-shadow: 0px 2px 1px lightgray;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: auto;
  max-height: 200px;
  padding: ${metrics.basePadding / 2}px;
  margin-bottom: ${metrics.baseMargin}px;
  position: relative;
`;

export const Cover = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 22px;
  height: 22px;
`;

export const Body = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 14px;
  line-height: 17px;
  width: 235px;
  text-align: justify;
  padding-left: ${metrics.basePadding / 2}px;
  padding-right: ${metrics.basePadding / 2}px;
`;

export const Status = styled.Text`
  font-family: 'Montserrat-Black';
  color: ${colors.green};
  font-size: 14px;
  line-height: 17px;
  text-align: center;
`;

export const Strong = styled.Text`
  font-family: 'Montserrat-Black';
  color: ${colors.black};
  font-size: 14px;
  letter-spacing: 14px;
  line-height: 17px;
`;

export const Checkbox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const CheckboxIcon = styled(Icon).attrs({
  name: 'ios-checkmark-circle-outline',
  size: 32,
  color: colors.altgray,
})``;
