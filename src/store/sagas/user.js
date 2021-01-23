import { call, put } from 'redux-saga/effects';
import { privateApi } from '../../services/api';
import UserActions from '../ducks/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationService from '../../services/NavigationService';

export function* saveUserToken({ token }) {
  try {
    yield call(privateApi.put, `/profile/save-token?token=${token}`);
    yield put(UserActions.saveTokenSuccess(token));
  } catch (err) {
    yield put(UserActions.saveTokenFailure(err));
  }
}

export function* getUser() {
  try {
    const response = yield call(privateApi.get, '/profile/me');

    yield put(UserActions.getUserSuccess(response.data));
    const token = yield call(AsyncStorage.getItem, 'fcmToken');
    yield put(UserActions.saveTokenRequest(token));
  } catch (err) {
    yield put(UserActions.getUserFailure(err));
  }
}

export function* updateUser({ name, email, mobile }) {
  try {
    const response = yield call(privateApi.put, '/profile/me', {
      name,
      email,
      mobile,
    });

    yield put(UserActions.updateUserSuccess(response.data));
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Seus dados foram alterados!',
      destination: 'Configs',
    });
  } catch (err) {
    yield put(UserActions.updateUserFailure(err.response.data.message));
  }
}

export function* changePassword({ oldPass, newPass, newPassConfirm }) {
  try {
    const response = yield call(privateApi.put, '/profile/change-password', {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmation: newPassConfirm,
    });
    yield put(UserActions.changePasswordSuccess(response.data));
    NavigationService.navigate('BankSlipSuccess', {
      message: 'Sua senha foi alterada!',
      destination: 'Configs',
    });
  } catch (err) {
    yield put(UserActions.changePasswordFailure(err.data));
  }
}
