import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  loadRequest: null,
  loadSuccess: ['data', 'loading'],
  loadFailure: null,
  loadFilterRequest: ['month', 'year'],
  loadFilterSuccess: ['filteredData', 'loading'],
  loadFilterFailure: null,
  deleteRequest: ['id'],
  deleteSuccess: null,
  deleteFailure: null,
  editRequest: ['slip', 'recurrent'],
  editSuccess: null,
  editFailure: null,
});

export const BankSlipsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  filteredData: [],
  loading: true,
});

// reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_REQUEST]: state => state.merge({ loading: true }),
  [Types.LOAD_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false }),
  [Types.LOAD_FILTER_REQUEST]: state => state.merge({ loading: true }),
  [Types.LOAD_FILTER_SUCCESS]: (state, { filteredData }) =>
    state.merge({ filteredData, loading: false }),
  [Types.DELETE_REQUEST]: state => state.merge({ loading: true }),
  [Types.DELETE_SUCCESS]: state => state.merge({ loading: false }),
  [Types.DELETE_FAILURE]: state => state.merge({ loading: false }),
  [Types.EDIT_REQUEST]: state => state.merge({ loading: true }),
  [Types.EDIT_SUCCESS]: state => state.merge({ loading: false }),
});
