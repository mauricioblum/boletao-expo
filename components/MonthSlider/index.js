import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { BigSlipsTypes } from 'store/ducks/bigslips';
import { BankSlipsTypes } from 'store/ducks/bankslips';
import { format } from 'date-fns';
import { privateApi } from 'services/api';
import { SlipScrollView, Title, Month, WrappedView } from './styles';

export default function MonthSlider({ big, custom, onMonthSelect }) {
  const scrollSlip = useRef(null);
  const [months, setMonths] = useState([
    {
      month: '2020-05',
      name: 'MAY',
      current: false,
      initial: 'MAI',
    },
    {
      month: '2020-06',
      name: 'JUNE',
      current: false,
      initial: 'JUN',
    },
    {
      month: '2020-07',
      name: 'JULY',
      current: false,
      initial: 'JUL',
    },
    {
      month: '2020-08',
      name: 'AUGUST',
      current: false,
      initial: 'AGO',
    },
    {
      month: '2020-09',
      name: 'SEPTEMBER',
      current: false,
      initial: 'SET',
    },
    {
      month: '2020-10',
      name: 'OCTOBER',
      current: false,
      initial: 'OUT',
    },
    {
      month: '2020-11',
      name: 'NOVEMBER',
      current: true,
      initial: 'NOV',
    },
    {
      month: '2020-12',
      name: 'DECEMBER',
      current: false,
      initial: 'DEZ',
    },
    {
      month: '2021-01',
      name: 'JANUARY',
      current: false,
      initial: 'JAN',
    },
    {
      month: '2021-02',
      name: 'FEBRUARY',
      current: false,
      initial: 'FEV',
    },
    {
      month: '2021-03',
      name: 'MARCH',
      current: false,
      initial: 'MAR',
    },
    {
      month: '2021-04',
      name: 'APRIL',
      current: false,
      initial: 'ABR',
    },
    {
      month: '2021-05',
      name: 'MAY',
      current: false,
      initial: 'MAI',
    },
  ]);
  const [selectedMonth, setSetSelectedMonth] = useState('');
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const dispatch = useDispatch();
  const today = Date.now();

  function scrollToPosition(posX) {
    if (scrollSlip.current) {
      scrollSlip.current.scrollTo({ x: posX, y: 0, animated: true });
    }
  }

  async function getMonths() {
    try {
      const response = await privateApi.get(`/bank-slip/months`);
      const monthsResponse = response.data;
      setMonths(monthsResponse);
    } catch (err) {
      // console.tron.log(err);
    }
  }

  useEffect(() => {
    getMonths();
  }, []);

  function handleSelectMonth(month) {
    const date = month.split('-');
    setSetSelectedMonth(month);
    dispatch({
      type: big
        ? BigSlipsTypes.LOAD_BIG_FILTER_REQUEST
        : BankSlipsTypes.LOAD_FILTER_REQUEST,
      month: date[1],
      year: date[0],
    });
  }

  useEffect(() => {
    handleSelectMonth(format(today, 'yyyy-MM'));
  }, []);

  useEffect(() => {
    if (currentMonthOffset !== 0) {
      scrollToPosition(currentMonthOffset - 150);
    }
  }, [currentMonthOffset]);

  return (
    <WrappedView>
      <SlipScrollView ref={scrollSlip}>
        {months.map((month) => (
          <Month
            selected={selectedMonth === month.month}
            key={month.month}
            onLayout={(event) => {
              if (month.current) {
                const { layout } = event.nativeEvent;
                console.log('layout x:', layout.x);
                setCurrentMonthOffset(layout.x);
              }
            }}
            onPress={() => {
              if (!custom) {
                handleSelectMonth(month.month);
                onMonthSelect(month);
              } else {
                setSetSelectedMonth(month.month);
                onMonthSelect(month);
              }
            }}
          >
            <Title white={selectedMonth === month.month}>{month.initial}</Title>
          </Month>
        ))}
      </SlipScrollView>
    </WrappedView>
  );
}

MonthSlider.propTypes = {
  big: PropTypes.bool,
  custom: PropTypes.bool,
  onMonthSelect: PropTypes.func,
};

MonthSlider.defaultProps = {
  big: false,
  custom: false,
  onMonthSelect: () => {},
};
