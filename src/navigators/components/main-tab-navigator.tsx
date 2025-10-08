/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeScreen } from '../../screens';

import { CustomTabBar } from './';

const MainTab = createBottomTabNavigator();
export const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Athletics-Bold',
        },
      }}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Logout" component={() => null} />
    </MainTab.Navigator>
  );
};
