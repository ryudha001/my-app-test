import { Divider } from '@rneui/base';
import React from 'react';
import {
  Image,
  StyleSheet,
  TextProps,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './text';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '../../styles/constants';
import { Space } from './space';

interface CardProps {
  image?: string;
  title?: string;
  subTitle?: string;
  description?: string | string[];
  note?: string | string[] | { text?: string } | { text?: string }[];
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  descriptionProps?: TextProps;
  noteStyle?: TextStyle;
  children?: React.ReactNode;
  childrenContainerStyle?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subTitle,
  description,
  note,
  containerStyle,
  titleStyle,
  subTitleStyle,
  descriptionStyle,
  descriptionProps,
  noteStyle,
  children,
  childrenContainerStyle,
  onPress,
}) => {
  const descriptions = description
    ? Array.isArray(description)
      ? description
      : [description]
    : [];
  const notes = note ? (Array.isArray(note) ? note : [note]) : [];

  return (
    <TouchableWithoutFeedback disabled={!onPress} onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {/* IMAGE */}
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* TITLE */}
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

        {/* SUBTITLE */}
        {subTitle && (
          <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
        )}

        {/* DESCRIPTION */}
        {descriptions.map((text, index) => (
          <Text
            key={index}
            style={[styles.description, descriptionStyle]}
            {...descriptionProps}
          >
            {text}
          </Text>
        ))}

        {/* CHILDREN */}
        {children && <View style={childrenContainerStyle}>{children}</View>}

        {/* NOTES */}
        {notes.length > 0 && (
          <View>
            <Space size={5} />
            <Divider />
            <Space size={5} />
            {notes.map((noteItem, index) => {
              const text =
                typeof noteItem === 'string' ? noteItem : noteItem.text || '';
              return (
                <Text key={index} style={[styles.note, noteStyle]}>
                  {text}
                </Text>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F5F3',
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.large,
    color: '#101614',
    lineHeight: 24,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: FONT_SIZE.base,
    color: COLOR.darkOrange,
    marginBottom: 5,
  },
  description: {
    color: COLOR.mediumGray,
    fontSize: FONT_SIZE.base,
    lineHeight: 20,
    marginBottom: 5,
  },
  note: {
    color: COLOR.mediumGray,
    fontSize: FONT_SIZE.small,
    lineHeight: 15,
    marginTop: 5,
  },
});
