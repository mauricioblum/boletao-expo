import { CommonActions } from '@react-navigation/native';

const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params) {
  if (config.navigator && routeName) {
    const action = CommonActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}

export function goBack() {
  if (config.navigator) {
    const action = CommonActions.back({});
    config.navigator.dispatch(action);
  }
}

export function backTo(key) {
  if (config.navigator) {
    const action = CommonActions.back(key);
    config.navigator.dispatch(action);
  }
}
