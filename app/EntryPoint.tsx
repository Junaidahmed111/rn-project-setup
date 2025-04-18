import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import NavigationStack from './navigation/NavigationStack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {RootState} from './store/slice';
import {darkTheme, lightTheme} from './constants/theme';
import i18n from './locales/i18n';
import {I18nextProvider} from 'react-i18next';

const RootNavigation: React.FC = () => {
  const insets = useSafeAreaInsets();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
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
    </PaperProvider>
  );
};

const EntryPoint: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <I18nextProvider i18n={i18n}>
            <RootNavigation />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default EntryPoint;
