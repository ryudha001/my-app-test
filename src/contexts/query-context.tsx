import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 mins
      refetchInterval: 5 * 60 * 1000, // 5 mins
    },
  },
});

export const QueryProvider = props => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
