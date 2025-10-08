import { InputProps } from '@rneui/base';
import React, { forwardRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSettings } from '../../redux/slices/settings/hooks';

import { Icon } from './icon';
import { Input } from './input';

interface Props extends InputProps {
  isResetPassword?: boolean | undefined;
}

export const InputPassword = forwardRef<typeof Input, Props>(
  ({ inputContainerStyle = {}, isResetPassword, ...props }, ref) => {
    const { password: prePassword } = useSettings();
    const [password, setPassword] = useState(
      isResetPassword ? '' : prePassword || '',
    );
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Input
        {...props}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={text => {
          setPassword(text);
          props.onChangeText && props.onChangeText(text);
        }}
        inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
        rightIcon={
          <TouchableWithoutFeedback onPress={toggleShowPassword}>
            <Icon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={32}
              color={'#D2C9F0'}
            />
          </TouchableWithoutFeedback>
        }
        rightIconContainerStyle={styles.rightIconContainer}
        ref={ref as any}
      />
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FBFBFD',
    height: 50,
  },
  rightIconContainer: {
    width: '20%',
    borderRadius: 12,
  },
});
