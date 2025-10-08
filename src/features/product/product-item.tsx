import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, FONT_FAMILY } from '../../styles/constants';

import { Card } from '../../components/ui';
import { Product } from '../../api/types';

interface ItemProps {
  product: Product;
  style?: ViewStyle;
  onSelect?: (id: number) => void;
}

export const ProductItem: React.FC<ItemProps> = ({
  product,
  style,
  onSelect,
}) => {
  const { title, description, thumbnail } = { ...product };

  return (
    <>
      <Card
        image={thumbnail}
        title={title}
        subTitle={''}
        description={description}
        subTitleStyle={styles.subTitle}
        descriptionStyle={styles.description}
        containerStyle={{ ...styles.card, ...style }}
        childrenContainerStyle={{}}
        onPress={() => onSelect && onSelect(product.id)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#F0F5F3',
    marginVertical: 5,
  },
  price: {
    fontFamily: FONT_FAMILY.extraBold,
    fontSize: 18,
    lineHeight: 20,
    paddingVertical: 5,
    color: COLOR.vibrantPurple,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLOR.vibrantPurple,
    borderColor: COLOR.vibrantPurple,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  subTitle: {
    color: COLOR.mediumGray,
  },
  description: {
    color: COLOR.darkOrange,
    fontWeight: 'bold',
  },
});
