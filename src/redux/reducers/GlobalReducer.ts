import {
  SHOW_LOADER,
  HIDE_LOADER,
  NET_INFO_UPDATE,
  BIOMETRIC_VERIFICATION,
} from '../actionTypes';

let initialState = {
  showLoader: false,
  isInternetReachable: false,
  isBiometricVerified: false,
};

interface IGlobalState {
  showLoader: boolean;
  isInternetReachable: boolean;
  isBiometricVerified: boolean;
}

const GlobalReducer = (state: IGlobalState = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    case NET_INFO_UPDATE:
      return {
        ...state,
        isInternetReachable: action.isInternetReachable,
      };
    case BIOMETRIC_VERIFICATION:
      return {
        ...state,
        isBiometricVerified: action.isBiometricVerified,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
