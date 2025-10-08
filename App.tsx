import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastMessage } from './src/components/ui';
import { ActionProvider } from './src/contexts/action-context';
import { AuthProvider } from './src/contexts/auth-context';
import { DeviceProvider } from './src/contexts/device-context';
import { GatewayProvider } from './src/contexts/gateway-context';
import { SpinnerProvider } from './src/contexts/spinner-context';
import { MainNavigator } from './src/navigators';
import { persistor, store } from './src/redux';
import { theme } from './src/styles/theme';
import RNBootsplash from 'react-native-bootsplash';
import { QueryProvider } from './src/contexts/query-context';

const App = () => {
  console.log('App');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SpinnerProvider>
        <SafeAreaProvider>
          <ReduxProvider store={store}>
            <DeviceProvider>
              <PersistGate loading={null} persistor={persistor}>
                <QueryProvider>
                  <NavigationContainer
                    theme={theme}
                    onReady={() => {
                      console.log('in');
                      RNBootsplash.hide();
                    }}
                  >
                    <ActionProvider>
                      <AuthProvider>
                        <GatewayProvider>
                          <MainNavigator />
                        </GatewayProvider>
                      </AuthProvider>
                    </ActionProvider>
                    <ToastMessage />
                  </NavigationContainer>
                </QueryProvider>
              </PersistGate>
            </DeviceProvider>
          </ReduxProvider>
        </SafeAreaProvider>
      </SpinnerProvider>
    </GestureHandlerRootView>
  );
};

export default App;
