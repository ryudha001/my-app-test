import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Product } from '../../features/product/product';

export const ProductScreen: React.FC<any> = ({ route }) => {
  const { id } = route?.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Product id={id} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
