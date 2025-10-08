import React from 'react';
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  TextStyle,
} from 'react-native';
import { StyleSheet } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { useAction } from '../../hooks';

export interface TextProps extends NativeTextProps {
  hasLink?: boolean;
  linkStyle?: TextStyle;
  // linkText?: (url: string) => string;
  onLinkPress?: (url: string, text?: string) => void;
  linkDefault?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  hasLink,
  linkStyle,
  // linkText,
  linkDefault,
  onLinkPress,
  ...props
}) => {
  const { dispatchAction } = useAction();

  if (hasLink) {
    return (
      <ParsedText
        style={StyleSheet.flatten([styles.text, style])}
        parse={[
          {
            type: 'url',
            style: StyleSheet.flatten([{ color: '#7F00FF' }, linkStyle]),
            onPress: (url: string) => {
              if (onLinkPress) {
                onLinkPress(url, url); // teks sama dengan url
                return;
              }
              if (!linkDefault && dispatchAction) {
                dispatchAction({
                  type: 'nav',
                  payload: {
                    screen: 'WebViewScreen',
                    params: { uri: url },
                  },
                });
              }
            },
          },
        ]}
        {...props}
      >
        <NativeText allowFontScaling={false} style={[styles.text, style]}>
          {children}
        </NativeText>
      </ParsedText>
    );
  }

  return (
    <NativeText
      allowFontScaling={false}
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Athletics',
    fontSize: 14,
    color: '#1D1D1F',
  },
});
