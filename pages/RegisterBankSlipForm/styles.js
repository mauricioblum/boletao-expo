import styled from 'styled-components/native';
import { Platform } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { CheckBox } from 'react-native-elements';
import { colors, metrics } from 'styles';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const PageHeader = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;
  letter-spacing: 0.14;
  text-align: left;
  margin-top: ${getStatusBarHeight() + 10}px;
  padding-left: ${metrics.basePadding + 10}px;
`;

export const FormAlt = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.select({
    android: null,
    ios: 'padding',
  }),
  keyboardVerticalOffset: metrics.basePadding,
})`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
  padding: 0px ${metrics.basePadding * 1.5}px;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  /* flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  margin-top: ${metrics.baseMargin}px;
  padding: 0px ${metrics.basePadding * 1.5}px;
`;

export const Label = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.darkgray};
  font-size: 13px;
  letter-spacing: 0.67;
  margin-bottom: ${metrics.baseMargin}px;
  text-align: left;
  align-self: flex-start;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'INSIRA O CÓDIGO DE BARRAS',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})`
  border: 1px solid ${colors.white};
  height: 60px;
  border-radius: ${metrics.baseRadius};
  width: 100%;
  text-align: center;
  padding: 0 20px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 10px lightgrey;
  color: #90959d;
  font-family: 'Montserrat-SemiBold';
  font-size: 13px;
  letter-spacing: 0.67;
  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const InputBarcode = styled(Input).attrs({
  placeholder: 'INSIRA O CÓDIGO DE BARRAS',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
  enablesReturnKeyAutomatically: true,
  returnKeyType: 'done',
})``;

export const InputBank = styled(Input).attrs({
  editable: false,
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'default',
})``;

export const InputValue = styled(Input).attrs({
  editable: true,
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})``;

export const InputDueDate = styled(Input).attrs({
  editable: false,
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'numeric',
})``;

export const DateSelect = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
`;

export const InputName = styled(Input).attrs({
  editable: true,
  placeholder: '',
  autoCapitalize: 'none',
  autoCorrect: false,
  keyboardType: 'default',
})``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0px 2px 10px rgba(14, 0, 233, 0.5);
  border-radius: ${metrics.baseRadius};
  height: 60px;
  margin-top: ${metrics.baseMargin * 2};
  margin-bottom: ${getBottomSpace()}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;

export const AlertError = styled.Text`
  color: ${colors.danger};
  text-align: center;
  font-size: 15px;
  letter-spacing: 0.62;
  font-family: 'Montserrat-SemiBold';
`;

export const RecurrentCheck = styled(CheckBox).attrs({
  containerStyle: {
    backgroundColor: colors.background,
    alignSelf: 'flex-start',
    paddingLeft: 0,
    marginLeft: 0,
  },
  textStyle: {
    color: colors.darkgray,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    letterSpacing: 0.67,
  },
})``;
