import { call, put } from 'redux-saga/effects';
import { privateApi } from '../../services/api';
import { format } from 'date-fns';
import BankSlipsActions, { BankSlipsTypes } from '../ducks/bankslips';
import * as NavigationService from '../../services/NavigationService';

export function* loadBankSlips() {
  try {
    const response = yield call(
      privateApi.get,
      '/dda/find-all-by-user-authenticated'
    );

    yield put(BankSlipsActions.loadSuccess(response.data));
  } catch (err) {
    yield put(BankSlipsActions.loadFailure());
    // console.tron.log(err.response);
  }
}

export function* loadBankSlipsByDate({ month, year }) {
  try {
    const response = yield call(
      privateApi.get,
      `/bank-slip/due-date/${year}/${month}`
    );

    yield put(BankSlipsActions.loadFilterSuccess(response.data));
  } catch (err) {
    yield put(BankSlipsActions.loadFilterFailure());
    // console.tron.log(err.response);
  }
}

export function* editBankSlip({ slip, recurrent, paid }) {
  try {
    yield call(privateApi.put, `/bank-slip/${slip.id}`, {
      longValue: slip.longValue.includes('R$')
        ? slip.longValue.replace('.', '').replace(',', '').replace('R$ ', '')
        : slip.longValue.replace('.', ''),
      name: slip.name,
      paid,
      dueDate: slip.dueDate,
      recurrent,
    });
    yield put(BankSlipsActions.editSuccess());
    const today = Date.now();
    yield put(BankSlipsActions.loadRequest());
    yield put(
      BankSlipsActions.loadFilterRequest(
        format(today, 'MM'),
        format(today, 'yyyy')
      )
    );
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Boleto editado com sucesso!',
      destination: 'BankSlips',
    });
  } catch (err) {
    yield put(BankSlipsActions.editFailure());
    console.tron.log(err.message);
  }
}

export function* deleteBankSlip({ id }) {
  try {
    yield call(privateApi.delete, `/bank-slip/${id}`);

    yield put(BankSlipsActions.deleteSuccess());
    yield put({ type: BankSlipsTypes.LOAD_REQUEST });
    yield call(NavigationService.navigate, 'BankSlips');
  } catch (err) {
    yield put(BankSlipsActions.deleteFailure());
  }
}
