import { reducer as user } from './user';
import { reducer as bankslips } from './bankslips';
import { reducer as bigslips } from './bigslips';
import { reducer as notifications } from './notifications';
import { reducer as iupaybigslips } from './iupaybigslips';

const reducers = {
  user,
  bankslips,
  bigslips,
  notifications,
  iupaybigslips,
};

export default reducers;
