// src/components/skeleton/ProductSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from 'react-native-loading-skeleton';
import { useDevice } from '../../hooks';

export const ProductSkeleton: React.FC = () => {
  const { width } = useDevice();
  const imageWidth = width * 0.9;

  return (
    <View style={styles.container}>
      <Skeleton
        style={[styles.image, { width: imageWidth, height: imageWidth }]}
      />
      <Skeleton style={[styles.title, { width: imageWidth }]} />
      <Skeleton style={[styles.title, { width: imageWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  title: {
    height: 24,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
});
