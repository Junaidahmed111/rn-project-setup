import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import {useState} from 'react';
import BottomTabNavigation from './BottomTabNav';

const AuthStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'Login'} component={Login} />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  return (
    <LoggedInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoggedInStack.Screen
        name={'BottomTabNavigation'}
        component={BottomTabNavigation}
      />
    </LoggedInStack.Navigator>
  );
};
const NavigationStack: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedInNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default NavigationStack;
