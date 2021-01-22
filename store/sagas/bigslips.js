import { call, put } from 'redux-saga/effects';
import { privateApi } from '../../services/api';
import BigSlipsActions, { BigSlipsTypes } from '../ducks/bigslips';
import * as NavigationService from '../../services/NavigationService';

export function* loadBigSlips() {
  try {
    const response = yield call(privateApi.get, `/big-bank-slip`);

    yield put(BigSlipsActions.loadBigSlipSuccess(response.data));
  } catch (err) {
    yield put(BigSlipsActions.loadBigSlipFailure());
    // console.tron.log(err.response);
  }
}

export function* loadBigSlipsByDate({ month, year }) {
  try {
    const response = yield call(
      privateApi.get,
      `/big-bank-slip/due-date/${year}/${month}`
    );

    yield put(BigSlipsActions.loadBigFilterSuccess(response.data));
  } catch (err) {
    yield put(BigSlipsActions.loadBigFilterFailure());
    // console.tron.log(err.response);
  }
}

export function* storeBigSlip({ slip }) {
  try {
    yield call(privateApi.post, `/big-bank-slip`, {
      longValue: parseInt(slip.value.toString().replace('.', ''), 10),
      name: slip.name,
      paid: false,
    });
    yield put(BigSlipsActions.editBigSlipSuccess());
    NavigationService.navigate('Main');
    yield call(BigSlipsActions.loadBigSlipRequest());
  } catch (err) {
    yield put(BigSlipsActions.editBigSlipFailure());
    // console.tron.log(err.message);
  }
}

export function* editBigSlip({ bigslip, slips }) {
  try {
    yield call(
      privateApi.put,
      `/big-bank-slip/${bigslip.id}/bank-slips`,
      slips
    );
    yield put(BigSlipsActions.editBigSlipSuccess());
    yield put(BigSlipsActions.loadBigSlipRequest());
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Boletos adicionados com sucesso ao seu Boletão!',
      destination: 'MyBigBankSlips',
    });
  } catch (err) {
    yield put(
      BigSlipsActions.editBigSlipFailure(
        'Erro ao adicionar boletos! Tente novamente mais tarde'
      )
    );
  }
}

export function* removeBigSlip({ bigslip, slipId }) {
  const slips = [];
  slips.push(slipId);
  try {
    yield call(privateApi.delete, `/big-bank-slip/${bigslip.id}/bank-slips`, {
      data: slips,
    });
    yield put(BigSlipsActions.removeBigSlipSuccess());
    yield put(BigSlipsActions.loadBigSlipRequest());
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Boleto removido!',
      destination: 'MyBigBankSlips',
    });
  } catch (err) {
    // console.tron.log(err.message);
    yield put(
      BigSlipsActions.removeBigSlipFailure(
        'Erro ao remover! Tente novamente mais tarde'
      )
    );
  }
}

export function* deleteBigSlip({ slipId }) {
  try {
    yield call(privateApi.delete, `/big-bank-slip/${slipId}`);

    yield put(BigSlipsActions.deleteBigSlipSuccess());
    yield put({ type: BigSlipsTypes.LOAD_BIG_SLIP_REQUEST });
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Boletão removido com sucesso',
      destination: 'IuPay',
    });
  } catch (err) {
    yield put(BigSlipsActions.deleteBigSlipFailure());
  }
}
