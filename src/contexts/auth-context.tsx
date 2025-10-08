import type { FC, ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import { LoginNavigator } from '../navigators';
import { useAuth } from '../redux/slices/auth/hooks';
import { useTimeout } from 'usehooks-ts';
import { useWatchdog } from '../hooks';

interface AuthContextValue {
  platform: 'JWT';
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  platform: 'JWT',
});

export const AuthProvider: FC<AuthProviderProps> = props => {
  const { children } = props;
  const {
    accessToken,
    refreshToken,
    isLoggedIn,
    tokenExpiryInMs,
    isValidToken,
    refreshTokenMutation,
    reset,
  } = useAuth();
  const { debug } = useWatchdog();

  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (initialized) return;

    if (accessToken && !isValidToken(accessToken)) {
      reset();
      return;
    }

    if (
      tokenExpiryInMs &&
      tokenExpiryInMs < 0 &&
      !refreshTokenMutation.isPending
    ) {
      console.log('refreshToken');
      refreshTokenMutation.mutate(
        { refreshToken: refreshToken || '' },
        {
          onSuccess: () => {
            debug('AuthContext.refreshToken', {
              success: true,
            });
          },
        },
      );
      return;
    }

    setInitialized(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, accessToken, refreshToken, tokenExpiryInMs]);

  useTimeout(
    () => refreshTokenMutation.mutate({ refreshToken: refreshToken || '' }),
    tokenExpiryInMs && tokenExpiryInMs > 0 ? tokenExpiryInMs : null,
  );

  if (!initialized) {
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{
        platform: 'JWT',
      }}
    >
      {isLoggedIn ? children : <LoginNavigator />}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
