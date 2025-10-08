import { Button as RNEButton } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '../ui';
import { useAction } from '../../hooks';
import { triggerHaptic } from '../../lib';
import { COLOR, FONT_FAMILY, FONT_WEIGHT } from '../../styles/constants';

import { Icon } from './icon';

interface Props {
  title?: string;
  icon?:
    | string
    | {
        name: string;
        type: string;
      };
  iconPosition?: 'top' | 'bottom' | 'left' | 'right';
  color?: string;
  loading?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  disableHaptic?: boolean;
  onPress?: Function;
  onPressAction?: any | any[];
  onPressHaptic?: any;
  onLongPress?: Function;
  onLongPressAction?: any | any[];
  onLongPressHaptic?: any;
  type?: 'solid' | 'outline' | 'clear';
  raised?: boolean;
  titleStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  style?: ViewStyle | (ViewStyle | undefined)[]; // button container style
}

export const Button: React.FC<Props> = ({
  title,
  icon,
  iconPosition = 'left',
  color = COLOR.vibrantPurple,
  loading,
  disabled,
  disableHaptic = true,
  uppercase,
  onPress,
  onPressAction,
  onPressHaptic,
  onLongPress,
  onLongPressAction,
  onLongPressHaptic,
  raised,
  titleStyle = {},
  titleContainerStyle = {},
  type = 'solid',
  style,
}) => {
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const { dispatchAction } = useAction();

  const iconSize = (dims.width > dims.height ? dims.height : dims.width) / 4;
  const iconName = (typeof icon === 'object' && icon.name) || icon;
  const iconType = (typeof icon === 'object' && icon.type) || 'ionicon';

  const isSolid = type === 'solid';
  const isOutline = type === 'outline';

  const fontSize = dims.width * 0.3;

  titleStyle = {
    color: isSolid ? COLOR.white : color,
    fontSize: fontSize > 18 ? 18 : 18,
    ...titleStyle,
  };

  const buttonStyle = {
    backgroundColor: isSolid ? color : 'transparent',
    borderWidth: isOutline ? 2 : 0,
    borderColor: color,
  };

  useEffect(() => {
    if (dims.width && dims.height) {
      setDims({
        width: dims.width,
        height: dims.height,
      });
    }
  }, [dims.width, dims.height]);

  return (
    <RNEButton
      raised={raised}
      onLayout={event => {
        setDims(event.nativeEvent.layout);
      }}
      style={[styles.base]}
      title={
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {uppercase ? String(title).toUpperCase() : title}
          </Text>
        </View>
      }
      buttonStyle={[styles.button, buttonStyle]}
      containerStyle={[styles.container, style]}
      icon={
        iconName ? (
          <Icon
            type={iconType}
            name={String(iconName)}
            color={color}
            round
            size={iconSize}
            disabled={!!disabled}
          />
        ) : undefined
      }
      iconPosition={iconPosition}
      disabledStyle={[styles.disabled]}
      loadingStyle={[styles.loading]}
      loading={loading}
      disabled={disabled}
      onPress={() => {
        if (!disableHaptic || onPressHaptic)
          triggerHaptic({ type: 'impactMedium', ...onPressHaptic });
        if (onPressAction)
          (Array.isArray(onPressAction)
            ? onPressAction
            : [onPressAction]
          ).forEach(dispatchAction);
        if (onPress) onPress();
      }}
      onLongPress={() => {
        if (!disableHaptic || onLongPressHaptic)
          triggerHaptic({ type: 'impactHeavy', ...onPressHaptic });
        if (onLongPressAction)
          (Array.isArray(onLongPressAction)
            ? onLongPressAction
            : [onLongPressAction]
          ).forEach(dispatchAction);
        if (onLongPress) onLongPress();
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 15,
  },
  base: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  title: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.default,
    fontSize: 18,
    fontWeight: FONT_WEIGHT.default,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {},
  disabled: {
    opacity: 0.7,
  },
  loading: {
    flex: 1,
    alignSelf: 'center',
  },
});
