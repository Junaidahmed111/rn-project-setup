import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {Platform} from 'react-native';
import BottomTab from './BottomTab';

const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();
const screenOptionsAndroid = {
  headerShown: false,
};
const screenOptionsIos = {
  headerShown: false,
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingBottom: 10,
        },
      }}
      //   tabBar={props => <BottomTab {...props} />}
      tabBar={() => <BottomTab />}>
      <Tab.Screen name="AppNavigator" component={AppNavigator} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={
        Platform.OS == 'android' ? screenOptionsAndroid : screenOptionsIos
      }>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};

export default BottomTabNavigation;
