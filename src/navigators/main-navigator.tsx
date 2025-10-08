import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MainTabNavigator } from './components';
import { ProductScreen } from '../screens/product/product-screen';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  const commonScreenOptions = {
    title: '',
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'Athletics',
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#FBFBFD',
    },
  };

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Group
        screenOptions={{
          title: '',
        }}
      >
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      </Stack.Group>
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
