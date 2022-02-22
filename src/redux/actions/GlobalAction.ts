import {
  SHOW_LOADER,
  HIDE_LOADER,
  NET_INFO_UPDATE,
  BIOMETRIC_VERIFICATION,
} from '../actionTypes';
import {store} from '../store';

export const showLoader = () => {
  store.dispatch({
    type: SHOW_LOADER,
  });
};

export const hideLoader = () => {
  store.dispatch({
    type: HIDE_LOADER,
  });
};

export const setNetInfo = (isInternetReachable: boolean | null) => {
  store.dispatch({
    type: NET_INFO_UPDATE,
    isInternetReachable,
  });
};

export const setBiometricVerification = (isBiometricVerified: boolean) => {
  store.dispatch({
    type: BIOMETRIC_VERIFICATION,
    isBiometricVerified,
  });
};
