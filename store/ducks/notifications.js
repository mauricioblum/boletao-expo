import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  saveNotifications: ['notifications'],
});

export const NotificationsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
});

// reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_NOTIFICATIONS]: (state, { notifications }) =>
    state.merge({ data: notifications }),
});
