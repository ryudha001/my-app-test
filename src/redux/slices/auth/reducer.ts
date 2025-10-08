import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  isLoggedIn: boolean;
  id: number | null;
  username: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
  isLoggedIn: false,
  id: null,
  username: null,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (): AuthState => {
      return initialState;
    },
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          (state as any)[key] = value;
        }
      });
    },
  },
});

export const { reducer, actions } = slice;
