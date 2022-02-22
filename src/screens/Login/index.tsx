import React from 'react';
import {View} from 'react-native';
import {login} from '../../redux/actions/UserAction';
import Button from '../../components/Button';

const App: React.FC = props => {
  const onLogin = () => {
    login();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default App;
