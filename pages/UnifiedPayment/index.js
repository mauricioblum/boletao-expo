import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  format,
  addMonths,
  setDate,
  isWeekend,
  startOfMonth,
  isBefore,
  addDays,
} from 'date-fns';
import { toCurrency } from 'utils/currency';
import StepHeader from '../../components/StepHeader';
import {
  Container,
  UnifiedValueContainer,
  UnifiedText,
  UnifiedValueText,
  CalendarContainer,
  SlipCalendar,
} from './styles';

export default function UnifiedPayment({ navigation }) {
  const unifiedValue = useSelector((state) =>
    state.iupaybigslips.data.reduce((sum, cur) => sum + cur.cost / 100, 0)
  );
  const selectedSlips = navigation.getParam('slips', []);
  const today = Date.now();
  const pivotDate = navigation.getParam('pivotDate', today);
  const [slipDate, setSlipDate] = useState({
    year: format(today, 'yyyy'),
    month: format(today, 'MM'),
    day: format(today, 'dd'),
    timestamp: today,
    dateString: '',
  });

  function getMarkedDates() {
    let pivot = pivotDate;
    const end = addMonths(today, 2);

    const dates = {};
    const disabled = { disabled: true };
    while (isBefore(pivot, end)) {
      if (isWeekend(pivot)) {
        dates[format(pivot, 'yyyy-MM-dd')] = disabled;
      }
      pivot = addDays(pivot, 1);
    }

    return dates;
  }

  const [dates, setDates] = useState(getMarkedDates());

  function handleSelectedDay(day) {
    const dateArr = { [day.dateString]: { selected: true } };
    setSlipDate(day);

    setDates(dateArr);
    navigation.navigate('UnifiedPaymentMethod', {
      unifiedValue,
      dueDay: day.day,
      dueMonth: day.month,
      dueYear: day.year,
      slips: selectedSlips,
    });
  }

  const minDate = pivotDate;
  const maxDate = setDate(addMonths(today, 1), 2);

  return (
    <Container>
      <StepHeader
        title="Unificação de Pagamento"
        subtitle="Defina um novo vencimento"
      />
      <CalendarContainer>
        <SlipCalendar
          minDate={minDate}
          maxDate={maxDate}
          markedDates={dates}
          current={slipDate}
          onDayPress={(day) => handleSelectedDay(day)}
          // onMonthChange={() => ()}
        />
      </CalendarContainer>
      <UnifiedValueContainer>
        <UnifiedText>VALOR TOTAL UNIFICADO</UnifiedText>
        <UnifiedValueText>{`R$${toCurrency(unifiedValue)}`}</UnifiedValueText>
      </UnifiedValueContainer>
    </Container>
  );
}

UnifiedPayment.navigationOptions = {
  header: null,
};

UnifiedPayment.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
