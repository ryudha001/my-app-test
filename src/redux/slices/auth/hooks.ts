import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useSpinner } from '../../../hooks';

import { resetStore } from '../../../redux';
import { RootReducer } from '../../root-reducer';
import { actions, AuthState } from './reducer';
import { TokenPayload } from './types';
import {
  LoginResponse,
  RefreshTokenResponse,
  useLoginMutation,
  useRefreshTokenMutation,
} from '../../../api';
import { showToast } from '../../../components/ui';

export const useAuth = () => {
  const auth = useSelector((state: RootReducer) => state.auth);
  const tokenPayload = auth.accessToken ? decodeToken(auth.accessToken) : null;
  const tokenExpiryInMs = tokenPayload
    ? tokenPayload.iat * 1000 + 15 * 60 * 1000 - new Date().getTime()
    : null; // 15 mins after issue time
  const { showSpinner, hideSpinner } = useSpinner();

  const setToken = (
    authState: Omit<AuthState, 'authenticated' | 'isLoggedIn'>,
  ) => {
    if (!isValidToken(authState.accessToken || '')) return;

    dispatch(
      actions.setAuth({
        ...authState,
        authenticated: true,
        isLoggedIn: true,
      }),
    );
  };

  const loginMutation = useLoginMutation({
    onMutate: () => {
      showSpinner();
    },
    onSuccess: (response: LoginResponse) => {
      setToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        id: response.id,
        username: response.username,
      });
      hideSpinner();
      console.log('✅ Logged in:', response);
    },
    onError: err => {
      hideSpinner();
      console.error('❌ Failed to login:', err?.message);
      showToast({
        type: 'error',
        text1: 'Oops!',
        text2: err?.message,
      });
    },
  });

  const refreshTokenMutation = useRefreshTokenMutation({
    onMutate: () => {
      showSpinner();
    },
    onSuccess: (response: RefreshTokenResponse) => {
      setToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        id: null,
        username: null,
      });
      hideSpinner();
      console.log('✅ New Token:', response);
    },
    onError: err => {
      hideSpinner();
      console.error('❌ Failed to refresh token:', err?.message);
    },
  });

  const dispatch = useDispatch();

  const reset = () => {
    resetStore();
  };

  const logout = () => {
    reset();
  };

  return {
    ...auth,
    tokenPayload,
    tokenExpiryInMs,
    loginMutation,
    refreshTokenMutation,
    logout,
    reset,
    setToken,
    isValidToken,
  };
};

function decodeToken(accessToken: string): TokenPayload | null {
  try {
    const res: TokenPayload = jwtDecode(accessToken);
    return res;
  } catch (error) {
    return null;
  }
}

function isValidToken(accessToken: string): boolean {
  const decodedToken = decodeToken(accessToken);
  if (!decodedToken) {
    return false;
  }
  const { exp } = decodedToken;
  return !exp || exp > Math.round(new Date().getTime() / 1000);
}
