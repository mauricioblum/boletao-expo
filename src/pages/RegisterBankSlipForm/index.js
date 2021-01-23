import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  Platform,
  Alert,
  DatePickerAndroid,
  DatePickerIOS,
  View,
} from 'react-native';
import { format, addDays, parseISO } from 'date-fns';
import { pt } from 'date-fns/esm/locale';
import PropTypes from 'prop-types';
import { privateApi } from 'services/api';

import {
  Container,
  PageHeader,
  Form,
  Label,
  InputBarcode,
  InputBank,
  InputValue,
  InputDueDate,
  InputName,
  Button,
  ButtonText,
  RecurrentCheck,
  DateSelect,
  AlertError,
} from './styles';
import { BankSlipsTypes } from 'store/ducks/bankslips';

export default function RegisterBankSlipForm({ navigation, route }) {
  const barcodeLine = route.params?.barcodeLine ?? 0;
  const [slipFields, setSlipFields] = useState({
    idUser: 0,
    line: barcodeLine,
    name: '',
    dueDate: '',
    dueDateString: '',
    bankCode: 0,
    id: 0,
    bankName: '',
    bankNameCompleto: '',
    value: '',
  });
  const [dateLocal, setDateLocal] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateIOS, setDateIOS] = useState(new Date());

  function handleInput(field, text) {
    setSlipFields({ ...slipFields, [field]: text });
  }

  async function handleReadSlip() {
    setLoading(true);
    try {
      const response = await privateApi.get(
        `/bank-slip/scanner?line=${slipFields.line}`
      );
      // console.tron.log(response.data);
      const { bankCode, id, bankName, value, dueDate } = response.data;
      let dateVenc = '';
      if (dueDate === null) {
        dateVenc = format(addDays(Date.now(), 7), 'yyyy-MM-dd');
      } else {
        dateVenc = dueDate;
      }
      setSlipFields({
        ...slipFields,
        bankCode,
        id,
        bankName,
        bankNameCompleto: `${bankCode} - ${bankName}`,
        value: `R$ ${value}`,
        dueDate: dateVenc,
      });
      setLoading(false);
    } catch (err) {
      // console.tron.log(err.message);
      console.log('barcode error', err);
      setLoading(false);
    }
  }

  function alertMessage(type, error) {
    Alert.alert(type, error, [{ text: 'OK', onPress: () => {} }], {
      cancelable: false,
    });
  }

  async function handleRegisterSlip() {
    setLoading(true);
    try {
      const { name, dueDate, line } = slipFields;
      // const formatedDate = dueDateString.replace(/\//g, '');
      const response = await privateApi.post(`/bank-slip`, {
        dueDate,
        line,
        name,
        paid: false,
        recurrent: checked,
      });
      // console.tron.log(response.data);
      setLoading(false);
      const today = Date.now();
      dispatch({
        type: BankSlipsTypes.LOAD_FILTER_REQUEST,
        month: format(today, 'MM'),
        year: format(today, 'yyyy'),
      });
      navigation.navigate('BankSlipSuccess', {
        message: 'Boleto cadastrado com sucesso!',
      });
    } catch (err) {
      alertMessage(
        'Erro!',
        'Erro ao salvar o boleto. Tente novamente mais tarde!'
      );
      setLoading(false);
      console.log('barcode error save', err);
    }
  }

  useEffect(() => {
    if (slipFields.dueDate !== '') {
      setDateLocal(
        format(parseISO(slipFields.dueDate), 'dd/MM/yyyy', { locale: pt })
      );
    }
  }, [slipFields.dueDate]);

  async function selectDate() {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          const formattedMonth =
            month + 1 > 9 ? `${month + 1}` : `0${month + 1}`;
          const formattedDay = day > 9 ? `${day}` : `0${day}`;
          const selectedDate = `${year}-${formattedMonth}-${formattedDay}`;
          setSlipFields({
            ...slipFields,
            dueDate: selectedDate,
          });
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    }
    if (Platform.OS === 'ios') {
      setShowDatePicker(true);
    }
  }

  function changeDateIOS(date) {
    setDateIOS(date);
    setShowDatePicker(false);
    setSlipFields({
      ...slipFields,
      dueDate: format(date, 'yyyy-MM-dd', { locale: pt }),
    });
  }

  useEffect(() => {
    handleReadSlip();
  }, []);

  return (
    <Container>
      <PageHeader>Cadastrar Boleto</PageHeader>
      <Form>
        <Label>CÓDIGO DE BARRAS</Label>
        <InputBarcode
          value={slipFields.line}
          onChangeText={(text) => handleInput('line', text)}
          onEndEditing={() => handleReadSlip()}
          onSubmitEditing={() => handleReadSlip()}
        />
        <Label>BANCO</Label>
        <InputBank value={slipFields.bankNameCompleto} />
        <Label>VALOR</Label>
        <InputValue
          value={slipFields.value}
          onChangeText={(text) => handleInput('value', text)}
        />
        <Label>DATA DE VENCIMENTO</Label>
        <DateSelect onPress={() => selectDate()}>
          {showDatePicker && (
            <DatePickerIOS
              date={dateIOS}
              mode="date"
              locale="pt-BR"
              onDateChange={(date) => changeDateIOS(date)}
            />
          )}
          <View pointerEvents="none">
            <InputDueDate
              value={dateLocal}
              // onChangeText={text => handleInput('dueDate', text)}
            />
          </View>
        </DateSelect>
        <Label>NOME DO BOLETO</Label>
        <InputName
          value={slipFields.name}
          onChangeText={(text) => handleInput('name', text)}
        />
        <RecurrentCheck
          title="BOLETO RECORRENTE"
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button onPress={() => handleRegisterSlip()}>
            <ButtonText>SALVAR</ButtonText>
          </Button>
        )}
      </Form>
    </Container>
  );
}

RegisterBankSlipForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

RegisterBankSlipForm.navigationOptions = {
  header: null,
};
