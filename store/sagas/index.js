import { all, takeLatest } from 'redux-saga/effects';

import { UserTypes } from '../ducks/user';
import { BankSlipsTypes } from '../ducks/bankslips';
import { BigSlipsTypes } from '../ducks/bigslips';
import { getUser, changePassword, saveUserToken, updateUser } from './user';
import {
  loadBankSlips,
  editBankSlip,
  deleteBankSlip,
  loadBankSlipsByDate,
} from './bankslips';
import {
  loadBigSlips,
  loadBigSlipsByDate,
  editBigSlip,
  removeBigSlip,
  deleteBigSlip,
} from './bigslips';

export default function* rootSaga() {
  yield all([
    takeLatest(UserTypes.GET_USER_REQUEST, getUser),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(UserTypes.SAVE_TOKEN_REQUEST, saveUserToken),
    takeLatest(BankSlipsTypes.LOAD_REQUEST, loadBankSlips),
    takeLatest(BankSlipsTypes.LOAD_FILTER_REQUEST, loadBankSlipsByDate),
    takeLatest(BankSlipsTypes.EDIT_REQUEST, editBankSlip),
    takeLatest(BankSlipsTypes.DELETE_REQUEST, deleteBankSlip),
    takeLatest(UserTypes.CHANGE_PASSWORD_REQUEST, changePassword),
    takeLatest(BigSlipsTypes.LOAD_BIG_SLIP_REQUEST, loadBigSlips),
    takeLatest(BigSlipsTypes.LOAD_BIG_FILTER_REQUEST, loadBigSlipsByDate),
    takeLatest(BigSlipsTypes.EDIT_BIG_SLIP_REQUEST, editBigSlip),
    takeLatest(BigSlipsTypes.REMOVE_BIG_SLIP_REQUEST, removeBigSlip),
    takeLatest(BigSlipsTypes.DELETE_BIG_SLIP_REQUEST, deleteBigSlip),
  ]);
}
