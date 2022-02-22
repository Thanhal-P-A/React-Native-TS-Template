import FingerprintScanner from 'react-native-fingerprint-scanner';

const BiometricScanner = (
  onSuccess: (biometricType: string) => void,
  onError?: (e: any) => void,
) => {
  var biometricType: string;

  const onAuthSuccess = () => {
    onSuccess && onSuccess(biometricType);
    FingerprintScanner.release();
  };
  const errorHandler = (error: {name: string}) => {
    switch (error.name) {
      case Error.BiometricNotSupported:
        break;
      default:
        onAuthError(error);
        break;
    }

    FingerprintScanner.release();
  };

  const onAuthError = (error: any) => {
    onError && onError(error);
  };

  FingerprintScanner.isSensorAvailable()
    .then(biometryType => {
      biometricType = biometryType;
      __DEV__ && console.log('---biometric--available--=>', biometryType);
      FingerprintScanner.authenticate({
        description: 'Scan your Biometric to continue',
        fallbackEnabled: false,
      })
        .then(() => {
          onAuthSuccess();
        })
        .catch(error => {
          errorHandler(error);
        });
    })
    .catch(error => {
      errorHandler(error);
    });

  return null;
};

export const Error = {
  BiometricNotEnrolled: 'FingerprintScannerNotEnrolled',
  BiometricNotAvailable: 'FingerprintScannerNotAvailable',
  BiometricNotSupported: 'FingerprintScannerNotSupported',
  BiometricPermanentLocked: 'DeviceLockedPermanent',
  BiometricTempLocked: 'DeviceLocked',
  FallbackPressed: 'UserFallback',
  UserCancel: 'UserCancel',
};

export default BiometricScanner;
