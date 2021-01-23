import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  loadBigSlipRequest: null,
  loadBigFilterRequest: ['month', 'year'],
  loadBigFilterSuccess: ['filteredData', 'loading'],
  loadBigFilterFailure: null,
  loadBigSlipSuccess: ['data', 'loading'],
  loadBigSlipFailure: null,
  deleteBigSlipRequest: ['slipId'],
  deleteBigSlipSuccess: null,
  deleteBigSlipFailure: null,
  storeBigSlipRequest: ['bigslipData'],
  storeBigSlipSuccess: null,
  storeBigSlipFailure: null,
  editBigSlipRequest: ['bigslip', 'slips'],
  editBigSlipSuccess: null,
  editBigSlipFailure: ['error'],
  removeBigSlipRequest: ['bigslip', 'slipId'],
  removeBigSlipSuccess: null,
  removeBigSlipFailure: ['error'],
});

export const BigSlipsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  filteredData: [],
  loading: true,
  error: null,
});

// reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_BIG_SLIP_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.LOAD_BIG_SLIP_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false }),
  [Types.DELETE_BIG_SLIP_REQUEST]: (state, { slipId }) =>
    state.merge({
      loading: true,
      data: state.data.filter(slip => slip.id !== slipId),
      filteredData: state.filteredData.filter(slip => slip.id !== slipId),
    }),
  [Types.DELETE_BIG_SLIP_SUCCESS]: state => state.merge({ loading: false }),
  [Types.DELETE_BIG_SLIP_FAILURE]: state => state.merge({ loading: false }),
  [Types.EDIT_BIG_SLIP_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.EDIT_BIG_SLIP_SUCCESS]: state =>
    state.merge({ loading: false, error: null }),
  [Types.EDIT_BIG_SLIP_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.REMOVE_BIG_SLIP_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.REMOVE_BIG_SLIP_SUCCESS]: state =>
    state.merge({ loading: false, error: null }),
  [Types.REMOVE_BIG_SLIP_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.LOAD_BIG_FILTER_REQUEST]: state => state.merge({ loading: true }),
  [Types.LOAD_BIG_FILTER_SUCCESS]: (state, { filteredData }) =>
    state.merge({ filteredData, loading: false }),
});
