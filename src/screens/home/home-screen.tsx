import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useGateway, useWatchdog } from '../../hooks';
import { useProductByIdQuery } from '../../api';
import { Product } from '../../api/types';
import { ProductList } from '../../features/product/product-list';
import { dispatchEvent, EVENT } from '../../hooks';
import { wait } from '../../lib';

export const HomeScreen = ({ navigation, route }) => {
  const { productsQuery } = useGateway();
  const [refreshing, setRefreshing] = useState(false);

  const { data } = productsQuery;
  const { watch } = useWatchdog();

  const productByIdQuery = useProductByIdQuery(1, {
    onSuccess: (products: Product[]) => {
      console.log(products);
    },
    onError: error => {
      watch('productsQuery', { error }, true);
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatchEvent(EVENT.app.pullRefresh);
    await wait(1000);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(productByIdQuery.data);
  }, [data, productByIdQuery.data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <ProductList
          isLoading={productsQuery.isFetching}
          label={'Products'}
          products={data || []}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowBase: {
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
