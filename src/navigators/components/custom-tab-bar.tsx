/* eslint-disable react-native/no-inline-styles */
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { Icon, Text } from '../../components/ui';
import { useAuth } from '../../redux/slices/auth/hooks';

const iOS = Platform.OS === 'ios';

const window = Dimensions.get('window');
const tabBarWidth = window.width / 5;

interface TabBarIconProps {
  focused: boolean;
}

const HomeTabIcon: React.FC<TabBarIconProps> = ({ focused }) => (
  <Icon
    name={focused ? 'home' : 'home-outline'}
    color={focused ? '#7F00FF' : '#1D1D1F99'}
    size={28}
    type="material-community"
  />
);

const LogoutTabIcon: React.FC<TabBarIconProps> = ({ focused }) => (
  <Icon
    name="logout"
    color={focused ? '#FF3B30' : '#1D1D1F99'}
    size={28}
    type="material-community"
  />
);

const TabIcon = ({ icon, focused }: { icon: any; focused: boolean }) => {
  const OneIcon = icon;
  return OneIcon ? <OneIcon focused={focused} /> : null;
};

const tabConfig = {
  Home: { icon: HomeTabIcon },
  Logout: { icon: LogoutTabIcon },
};

export const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  const { reset } = useAuth();

  const handleTabPress = () => {};

  const handleLongPress = () => {};

  const handleLogout = () => {
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const isFocused = props.state.index === index;
          const isLogout = route.name === 'Logout';

          if (isLogout) {
            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                onPress={handleLogout}
                style={styles.tabContainer}
              >
                <View style={styles.tab}>
                  <TabIcon focused={false} icon={tabConfig[route.name]?.icon} />
                  <Text style={{ ...styles.label, color: '#FF3B30' }}>
                    {route.name}
                  </Text>
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => handleTabPress()}
              onLongPress={() => handleLongPress()}
            >
              <View style={styles.tabContainer}>
                <View
                  style={{ ...styles.tab, ...tabConfig[route.name]?.style }}
                >
                  <TabIcon
                    focused={isFocused}
                    icon={tabConfig[route.name]?.icon}
                  />
                  <Text
                    style={
                      isFocused
                        ? { ...styles.label, color: '#7F00FF' }
                        : styles.label
                    }
                  >
                    {route.name}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: iOS ? 80 : 60,
    backgroundColor: '#EEECDE',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabContainer: {
    backgroundColor: '#FBFBFD',
  },
  tab: {
    width: tabBarWidth,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#EEECDE',
  },
  label: {
    color: 'grey',
    marginTop: iOS ? 2 : 0,
    fontSize: 10,
  },
});
