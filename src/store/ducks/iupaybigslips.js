import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  saveIupay: ['data'],
  removeSlip: ['slipId'],
  clearIupay: null,
});

export const IuPayBigSlipsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: null,
});

// reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_IUPAY]: (state, { data }) => {
    const currentSlips = [...state.data];
    const alreadyAdded = currentSlips.find(slip => slip.id === data.id);
    if (!alreadyAdded) {
      currentSlips.push(data);
      console.log('slip added', currentSlips);
      return state.merge({ data: currentSlips });
    }
    console.log('slip already exist or not added');
    return state;
  },
  [Types.REMOVE_SLIP]: (state, { slipId }) => {
    const currentSlips = [...state.data];
    const exists = currentSlips.find(slip => slip.id === slipId);
    if (exists) {
      console.log('removendo boleto');
      return state.merge({
        data: currentSlips.filter(slip => slip.id !== slipId),
      });
    }
    console.log('boleto não removido');
    return state;
  },
  [Types.CLEAR_IUPAY]: state => state.merge({ data: [] }),
});
