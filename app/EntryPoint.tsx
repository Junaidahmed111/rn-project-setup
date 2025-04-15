import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import NavigationStack from './navigation/NavigationStack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const RootNavigation: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        // backgroundColor: 'green',
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <NavigationStack />
    </View>
  );
};

const EntryPoint: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default EntryPoint;
