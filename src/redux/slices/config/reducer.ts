import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ConfigState {
  common: { [key: string]: any };
}

const initialState: ConfigState = {
  common: {
    slackWebhooK: '',
    slackWebhookDev: '',
  },
};

export const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: (): ConfigState => {
      return initialState;
    },
    setConfig: (
      state: ConfigState,
      action: PayloadAction<{ config: ConfigState }>,
    ): void => {
      const { ...common } = action.payload.config;
      state.common = { ...state.common, ...common };
    },
  },
});

export const { reducer, actions } = slice;
