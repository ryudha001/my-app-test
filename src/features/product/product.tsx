import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '../../components/ui';
import { ProductSkeleton } from './product-skeleton';
import { useProductByIdQuery } from '../../api';

interface Props {
  id: string;
}

export const Product: React.FC<Props> = ({ id }) => {
  const { data: product, isFetching, isError } = useProductByIdQuery(id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);

  return (
    <View style={styles.container}>
      {/* SKELETON */}
      {loading && <ProductSkeleton />}

      {/* FAILED LOAD PRODUCT */}
      {isError && !product && (
        <View style={styles.loadingContainer}>
          <Text>Failed to load product.</Text>
        </View>
      )}

      {/* PRODUCT */}
      {!loading && product && (
        <Card
          image={product.thumbnail}
          title={product.title}
          description={product.description}
          descriptionStyle={styles.description}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
});
