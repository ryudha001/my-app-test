import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text } from '../../components/ui';
import { Product } from '../../api/types';
import { ProductItem } from './product-item';
import { useAction } from '../../hooks';
import { ProductListSkeleton } from './product-list-skeleton';

const noResultsImage = require('../../../assets/images/zoom-out-area.png');

interface ProductListProps {
  label?: string;
  products: Product[];
  isLoading?: boolean;
}

const EmptyState: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Image
      source={noResultsImage}
      resizeMode="contain"
      style={styles.emptyImage}
    />
    <Text style={styles.emptyText}>No Product Available</Text>
  </View>
);

export const ProductList: React.FC<ProductListProps> = ({
  label,
  products,
  isLoading = true,
}) => {
  const { dispatchAction } = useAction();

  const selectProduct = (id: number) => {
    dispatchAction({
      type: 'nav',
      payload: {
        screen: 'ProductScreen',
        params: { id },
      },
    });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.row}>
      <ProductItem product={item} onSelect={selectProduct} />
    </View>
  );

  const keyExtractor = (item: Product, index: number) => `${item.id}-${index}`;

  return (
    <View style={styles.container}>
      {/* LABEL */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}

      {/* CONTENT */}
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={EmptyState}
          contentContainerStyle={
            products.length === 0 ? { flex: 1 } : undefined
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  row: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#797C7B',
  },
});
