import * as React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TRootState} from '../redux/store';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ToDo from '../screens/ToDo';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const {UserReducer} = useSelector((state: TRootState) => state);
  const {isLoggedIn} = UserReducer ?? false;
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
