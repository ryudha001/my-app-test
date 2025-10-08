import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from 'react-native-loading-skeleton';

export const ProductListSkeleton: React.FC<{ count?: number }> = ({
  count = 4,
}) => {
  const items = Array.from({ length: count });

  return (
    <View>
      {items.map((_, index) => (
        <View key={`skeleton-${index}`} style={styles.row}>
          <Skeleton style={styles.skeletonImage} />
          <Skeleton style={styles.skeletonText} />
          <Skeleton style={[styles.skeletonText, { width: '60%' }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  skeletonImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#E0E0E0',
  },
  skeletonText: {
    height: 20,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#E0E0E0',
  },
});
