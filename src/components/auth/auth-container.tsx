import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyTheme, useDevice } from '../../hooks';
import { ThreeStars, YellowCat } from '../svg';
import { Icon } from '../ui';

interface Props extends ViewStyle {
  children: React.ReactNode;
  dark?: boolean;
  onTouchStart?: Function;
}

export const AuthContainer: React.FC<Props> = ({
  children,
  dark = false,
  onTouchStart,
}) => {
  const navigation = useNavigation();
  const { colors } = useMyTheme();
  const [showBackButton, setShowBackButton] = useState(navigation.canGoBack());
  const { navBarHeight } = useDevice();
  const opacity = dark ? 0.3 : 1.0;

  useEffect(() => {
    setShowBackButton(navigation.canGoBack());
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.authBackground }]}
    >
      <StatusBar barStyle="light-content" />
      {showBackButton ? (
        <TouchableOpacity
          style={[styles.leftButton, { top: navBarHeight }]}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" color={colors.secondary} size={25} />
        </TouchableOpacity>
      ) : null}
      <ThreeStars style={[styles.stars, { opacity }]} />
      <YellowCat style={[styles.cat, { opacity }]} />
      <KeyboardAwareScrollView
        onTouchStart={() => onTouchStart && onTouchStart()}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  leftButton: {
    zIndex: 99999,
    position: 'absolute',
    left: 10,
    width: 50,
    height: 50,
  },
  stars: {
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
  },
  cat: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
});
