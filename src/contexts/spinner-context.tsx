import PropTypes from 'prop-types';
import type { ReactNode } from 'react';
import { createContext } from 'react';
import React, { useState } from 'react';
import Spinner, {
  SpinnerPropTypes,
} from 'react-native-loading-spinner-overlay';

interface SpinnerContextValue {
  showSpinner: (params?: any) => void;
  hideSpinner: () => void;
}
interface SpinnerProviderProps {
  children?: ReactNode;
}
export const SpinnerContext = createContext<SpinnerContextValue>({
  showSpinner: () => {},
  hideSpinner: () => {},
});

export const SpinnerProvider = (props: SpinnerProviderProps) => {
  const { children } = props;
  const [spinnerProps, setSpinnerProps] = useState<SpinnerPropTypes>({
    visible: false,
  });

  const showSpinner = (params: any) => {
    setSpinnerProps({ ...params, visible: true });
  };

  const hideSpinner = () => {
    setSpinnerProps(state =>
      state.visible ? { ...state, visible: false } : state,
    );
  };

  return (
    <SpinnerContext.Provider
      value={{
        showSpinner,
        hideSpinner,
      }}
    >
      <>
        {children}
        <Spinner {...spinnerProps} />
      </>
    </SpinnerContext.Provider>
  );
};

SpinnerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SpinnerConsumer = SpinnerContext.Consumer;
