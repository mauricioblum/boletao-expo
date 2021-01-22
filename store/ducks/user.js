import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getUserRequest: null,
  getUserSuccess: ['data'],
  getUserFailure: ['error'],
  changePasswordRequest: ['oldPass', 'newPass', 'newPassConfirm'],
  changePasswordSuccess: null,
  changePasswordFailure: ['error'],
  clearError: null,
  saveTokenRequest: ['token'],
  saveTokenSuccess: ['token'],
  saveTokenFailure: ['error'],
  updateUserRequest: ['name', 'email', 'mobile'],
  updateUserSuccess: ['data'],
  updateUserFailure: ['error'],
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  token: null,
  loading: false,
  error: null,
  iupayUserBasicAuth: 'mauricio@test.io:123',
});

// reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_REQUEST]: state => state.merge({ loading: true }),
  [Types.GET_USER_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false }),
  [Types.GET_USER_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.CHANGE_PASSWORD_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.CHANGE_PASSWORD_SUCCESS]: state =>
    state.merge({ loading: false, error: null }),
  [Types.CHANGE_PASSWORD_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.CLEAR_ERROR]: state => state.merge({ error: null }),
  [Types.SAVE_TOKEN_REQUEST]: state => state.merge({ loading: true }),
  [Types.SAVE_TOKEN_SUCCESS]: (state, { token }) =>
    state.merge({ token, loading: false }),
  [Types.SAVE_TOKEN_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.UPDATE_USER_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.UPDATE_USER_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false }),
  [Types.UPDATE_USER_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
});
