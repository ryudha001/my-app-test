import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  env: 'prod' | 'sit' | 'pp';
  email: string;
  password: string;
}

const initialState: SettingsState = {
  env: 'prod',
  email: '',
  password: '',
};

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reset: (): SettingsState => {
      return initialState;
    },
    setSettings: (
      state: SettingsState,
      action: PayloadAction<{ settings: any }>,
    ): SettingsState => {
      const { settings } = action.payload;
      return settings;
    },
  },
});

export const { reducer, actions } = slice;
