import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
  justify-content: center;
`;

export const OuterContainer = styled.View`
  flex: 1;
  background-color: linear-gradient(rgb(234, 239, 245), #ffffff);
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;

  text-align: left;
  margin-top: ${getStatusBarHeight() + 10}px;
  padding-left: ${metrics.basePadding}px;
  align-self: flex-start;
`;

export const Form = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputCpf = styled.TextInput.attrs({
  placeholder: 'INSIRA SEU CPF',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius}px;
  width: 80%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
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

export const MenuWrapper = styled.View`
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius * 3 - 9}px;
  margin-left: ${-metrics.baseMargin * 2}px;
  margin-top: ${metrics.baseMargin * 3}px;
  width: 330px;
  height: auto;
  padding: ${metrics.basePadding * 2}px;
  box-shadow: 0px 2px 22px lightgray;
  flex-direction: column;
  justify-content: space-around;
`;

export const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-bottom: ${metrics.baseMargin * 3}px;
`;

export const MenuItemText = styled.Text`
  font-family: 'Montserrat-Medium';

  font-size: 14px;
  color: ${colors.black};
`;

export const VersionText = styled.Text`
  font-family: 'Montserrat-Regular';

  font-size: 12px;
  margin-left: 5px;
  margin-top: 5px;
  color: ${colors.black};
`;
