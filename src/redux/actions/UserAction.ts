import {LOGIN, LOGOUT, SET_BIOMETRIC} from '../actionTypes';
import {store} from '../store';

export const login = () => {
  store.dispatch({
    type: LOGIN,
  });
};

export const logout = () => {
  store.dispatch({
    type: LOGOUT,
  });
};

export const setBiometric = (isBiometricEnabled: boolean) => {
  store.dispatch({
    type: SET_BIOMETRIC,
    isBiometricEnabled,
  });
};
