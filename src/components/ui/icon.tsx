import { Icon as RNEIcon, IconProps } from '@rneui/base';
import React from 'react';
import { ViewStyle } from 'react-native';
import { useMyTheme } from '../../hooks';

export interface Props extends IconProps {
  round?: boolean;
  solid?: boolean;
  disabled?: boolean;
}

export const Icon: React.FC<Props> = ({
  type,
  round,
  disabled,
  size,
  solid,
  containerStyle,
  ...props
}) => {
  const { colors } = useMyTheme();

  const _containerStyle: ViewStyle = {};
  if (round && size) {
    const sizeX2 = size * 2;
    _containerStyle.borderRadius = sizeX2;
    _containerStyle.height = sizeX2;
    _containerStyle.width = sizeX2;
    _containerStyle.alignItems = 'center';
    _containerStyle.justifyContent = 'center';
    _containerStyle.backgroundColor =
      containerStyle?.backgroundColor || '#FBFBFD';
  }
  if (disabled) {
    _containerStyle.opacity = 0.5;
  }

  return (
    <RNEIcon
      type={type ? type : 'material-community'}
      color={colors.primary}
      solid={solid}
      size={size}
      containerStyle={[containerStyle, _containerStyle]}
      {...props}
    />
  );
};
