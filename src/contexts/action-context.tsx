import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';
import { createContext } from 'react';
import React from 'react';
import { Platform } from 'react-native';
import { consoleLog } from '../lib/index';

export type Action =
  | {
      type: 'nav';
      payload: {
        screen: string;
        params: any;
      };
    }
  | {
      type: 'gotoStore';
      payload: {};
    };

interface ActionContextValue {
  dispatchAction: React.Dispatch<any>;
}
interface ActionProviderProps {
  children?: ReactNode;
}

export const ActionContext = createContext<ActionContextValue>({
  dispatchAction: () => {},
});

export const ActionProvider = (props: ActionProviderProps) => {
  const { children } = props;
  const navigation = useNavigation();

  const handlers = {
    nav: (action: Action) => {
      const { screen, params } = action.payload;
      navigation.navigate(screen, params);
    },
    gotoStore: () => {
      if (Platform.OS === 'android') {
        // playStoreLink && Linking.openURL(playStoreLink);
      } else {
        // appStoreLink && Linking.openURL(appStoreLink);
      }
    },
  };

  const dispatchAction = (action: Action) => {
    consoleLog('dispatchAction', action);
    handlers[action.type] && handlers[action.type](action);
  };

  return (
    <ActionContext.Provider value={{ dispatchAction }}>
      <>{children}</>
    </ActionContext.Provider>
  );
};

ActionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ActionConsumer = ActionContext.Consumer;
