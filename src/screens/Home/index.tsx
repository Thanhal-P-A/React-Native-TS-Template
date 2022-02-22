import React from 'react';
import {View, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {logout, setBiometric} from '../../redux/actions/UserAction';
import {setBiometricVerification} from '../../redux/actions/GlobalAction';
import BiometricScanner from '../../common/BiometricScanner';
import DocumentPicker from '../../common/DocumentPicker';
import {TRootState} from '../../redux/store';
import {encrypt, decrypt} from '../../common/Encryption';
import Button from '../../components/Button';

const App = ({navigation}: NativeStackScreenProps<any>) => {
  const {UserReducer} = useSelector((state: TRootState) => state);
  const {isBiometricEnabled} = UserReducer ?? false;

  const testEncryption = async () => {
    const uID = 'user123';
    const val = 'test encryption';
    const enc = await encrypt(val, uID);
    const dec = await decrypt(enc, uID);
    Alert.alert(
      'Encryption Test',
      `Data : ${val}\n\nEncrypted data : ${enc}\n\nDecrypted data : ${dec}`,
    );
  };

  const onLogout = () => {
    logout();
  };

  const setupBiometricLock = () => {
    __DEV__ && console.log('\n\nBiometric success');
    setBiometricVerification(true);
    setBiometric(true);
  };

  const onPickerSuccess = (res: any) => {
    __DEV__ && console.log('\n\nPicker Response : ', res);
    Alert.alert(
      'File Details',
      `Name :  ${res?.name}\n\nType : ${res?.type}\n\nSize : ${(res?.size/1000000).toFixed(2)} mb\n\nPath : ${res?.fileCopyUri}`,
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title={!isBiometricEnabled ? 'Enable Biometric' : 'Disable Biometric'}
        onPress={() =>
          !isBiometricEnabled
            ? BiometricScanner(() => setupBiometricLock())
            : setBiometric(false)
        }
      />
      <Button title="Test Encryption" onPress={() => testEncryption()} />
      <Button
        title="Open Picker"
        onPress={() => DocumentPicker((res: any) => onPickerSuccess(res))}
      />
      <Button
        title="Test SQL with ToDo"
        onPress={() => navigation.navigate('ToDo')}
      />
      <Button title="Logout" onPress={() => onLogout()} />
    </View>
  );
};

export default App;
