import PropTypes from 'prop-types';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { Appearance } from 'react-native';

interface ThemeContextValue {
  textVariants: any;
  fontSizes: any;
}
interface ThemeProviderProps {
  theme: any;
  children?: ReactNode;
}
export const ThemeContext = createContext<ThemeContextValue>({
  textVariants: {},
  fontSizes: {},
});

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, theme } = props;
  const [colorMode, setColorMode] = useState(
    Appearance.getColorScheme() || 'dark',
  );
  const { colorScheme, ...extraTheme } = theme;
  extraTheme.color = { ...extraTheme.color, ...colorScheme[colorMode] };

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      const value = Appearance.getColorScheme();
      value && setColorMode(value);
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ ...extraTheme, colorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ThemeConsumer = ThemeContext.Consumer;
