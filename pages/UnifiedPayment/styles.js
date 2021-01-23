import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.br = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

export const Container = styled.View`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarContainer = styled.View`
  flex-direction: column;
  padding: 0px ${metrics.basePadding - 3}px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: column;
  margin-top: ${getStatusBarHeight() + 10}px;
  margin-left: ${metrics.baseMargin}px;
  margin-right: ${metrics.baseMargin}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 24px;

  text-align: center;
`;

export const HeaderSubTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  color: ${colors.altgray};
  font-size: 13px;
`;

export const HeaderIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: ${metrics.basePadding}px 0px;
`;

export const UnifiedValueContainer = styled.View.attrs({
  borderTopColor: colors.gray,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.gray,
  borderBottomWidth: StyleSheet.hairlineWidth,
})`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${metrics.baseMargin * 5}px;
  padding: ${metrics.basePadding}px 0px;
  margin-left: ${metrics.baseMargin}px;
  margin-right: ${metrics.baseMargin}px;
  margin-bottom: ${getBottomSpace()}px;
`;

export const UnifiedText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  color: ${colors.black};
  font-size: 13px;
  text-align: center;
`;

export const UnifiedValueText = styled.Text`
  font-family: 'Montserrat-Black';
  color: ${colors.black};
  font-size: 13px;

  text-align: right;
`;

export const SlipCalendar = styled(Calendar).attrs({
  theme: {
    backgroundColor: colors.background,
    calendarBackground: colors.background,
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colors.black,
    selectedDayTextColor: '#ffffff',
    todayTextColor: colors.black,
    dayTextColor: colors.black,
    textDisabledColor: '#d9e1e8',
    dotColor: colors.black,
    selectedDotColor: '#ffffff',
    arrowColor: colors.black,
    monthTextColor: colors.black,
    indicatorColor: 'blue',
    textDayFontFamily: 'Montserrat-SemiBold',
    textMonthFontFamily: 'Montserrat-SemiBold',
    textDayHeaderFontFamily: 'Montserrat-SemiBold',
    textDayFontSize: 14.5,
    textMonthFontSize: 15.7,
    textDayHeaderFontSize: 15.7,
  },
})`
  height: 300px;
  width: 100%;
  background-color: ${colors.background};
`;
