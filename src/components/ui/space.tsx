import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface SpaceProps {
  size?: number;
  style?: ViewStyle;
}

export const Space: React.FC<SpaceProps> = ({ size, style }) => {
  return size ? (
    <View style={[styles.container, { height: size, width: size }, style]} />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
  },
});
