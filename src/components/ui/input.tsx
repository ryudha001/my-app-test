import { Input as RNEInput, InputProps } from '@rneui/base';
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';

interface Props extends InputProps {}

export const Input = forwardRef<RNEInput, Props>(
  (
    {
      containerStyle = {},
      labelStyle = {},
      inputContainerStyle = {},
      inputStyle = {},
      leftIconContainerStyle = {},
      rightIconContainerStyle = {},
      errorStyle = {},
      ...props
    },
    ref,
  ) => {
    return (
      <RNEInput
        containerStyle={StyleSheet.flatten([styles.container, containerStyle])}
        labelStyle={StyleSheet.flatten([styles.label, labelStyle])}
        inputContainerStyle={StyleSheet.flatten([
          styles.inputContainer,
          inputContainerStyle,
        ])}
        inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
        leftIconContainerStyle={StyleSheet.flatten([
          styles.leftIconContainer,
          leftIconContainerStyle,
        ])}
        rightIconContainerStyle={StyleSheet.flatten([
          styles.rightIconContainer,
          rightIconContainerStyle,
        ])}
        errorStyle={StyleSheet.flatten([styles.errorText, errorStyle])}
        autoCapitalize={'none'}
        autoCorrect={false}
        {...props}
        ref={ref as any}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 12,
  },
  label: {},
  inputContainer: {
    borderRadius: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingLeft: 20,
  },
  leftIconContainer: {},
  rightIconContainer: {},
  errorText: {
    width: '100%',
    color: '#E22D3A',
    fontSize: 14,
  },
});
