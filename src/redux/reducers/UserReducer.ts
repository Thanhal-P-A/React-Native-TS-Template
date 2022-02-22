import {LOGIN, LOGOUT, SET_BIOMETRIC} from '../actionTypes';

let initialState = {
  isLoggedIn: false,
  isBiometricEnabled: false,
  token: '',
};

interface IUserState {
  isLoggedIn: boolean;
  isBiometricEnabled: boolean;
  token: string;
}

const UserReducer = (state: IUserState = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isBiometricEnabled: false,
      };
    case SET_BIOMETRIC:
      return {
        ...state,
        isBiometricEnabled: action.isBiometricEnabled,
      };
    default:
      return state;
  }
};

export default UserReducer;
