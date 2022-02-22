import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, Alert, BackHandler} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import BiometricScanner from './common/BiometricScanner';
import {
  setNetInfo,
  setBiometricVerification,
} from './redux/actions/GlobalAction';
import {TRootState} from './redux/store';
import Router from './navigation';

const exceptionhandler = (exceptionString: any) => {
  if (exceptionString != undefined)
    __DEV__ && console.log('exceptionString : ', exceptionString);
  exitAppAlert();
};

setNativeExceptionHandler(exceptionhandler, false);

const errorHandler = (error: any) => {
  __DEV__ && console.log('error handler : ', error);
  if (error != undefined && !error.toString().includes('componentWillUnmount'))
    exitAppAlert();
};

setJSExceptionHandler(errorHandler, true);

const exitAppAlert = () => {
  Alert.alert(
    'Unexpected error occurred !',
    'We have reported this to our team.\nPlease close the app and start again.',
    [
      {
        text: 'Exit App',
        onPress: () => BackHandler.exitApp(),
      },
    ],
    {
      cancelable: false,
    },
  );
};

const App: React.FC = () => {
  const {UserReducer, GlobalReducer} = useSelector(
    (state: TRootState) => state,
  );
  const {isBiometricEnabled} = UserReducer ?? false;
  const {isBiometricVerified} = GlobalReducer ?? false;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    isBiometricEnabled &&
      !isBiometricVerified &&
      BiometricScanner(
        () => setBiometricVerfied(),
        (e: any) => onBiometricError(e),
      );
  }, [isBiometricEnabled, isBiometricVerified]);

  const setBiometricVerfied = () => {
    __DEV__ && console.log('\n\nBiometric verified');
    setBiometricVerification(true);
  };

  const onBiometricError = (error: any) => {
    __DEV__ && console.log('\n\nBiometric verification error: ', error);
    BiometricScanner(
      () => setBiometricVerfied(),
      (e: any) => onBiometricError(e),
    );
  };

  return (
    <>
      <SafeAreaView />
      <Router></Router>
    </>
  );
};

export default App;
