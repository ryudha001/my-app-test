import type { ReactNode } from 'react';
import React, { createContext } from 'react';
import { useWatchdog, useEvent, EVENT } from '../hooks';
import { useProductsQuery } from '../api';
import { Product } from '../api/types';
import { UseQueryResult } from '@tanstack/react-query';

interface GatewayContextValue {
  productsQuery: UseQueryResult<Product[], Error>;
}

interface GatewayProviderProps {
  children?: ReactNode;
}

export const GatewayContext = createContext<GatewayContextValue>({});

export const GatewayProvider = (props: GatewayProviderProps) => {
  const { children } = props;
  const { watch } = useWatchdog();

  const productsQuery = useProductsQuery({
    onSuccess: (data: Product[]) => {
      console.log(data);
    },
    onError: error => {
      watch('productsQuery', { error }, true);
    },
  });

  useEvent(EVENT.app.pullRefresh, () => {
    productsQuery.refetch();
  });

  return (
    <GatewayContext.Provider value={{ productsQuery }}>
      {children}
    </GatewayContext.Provider>
  );
};

export const GatewayConsumer = GatewayContext.Consumer;
