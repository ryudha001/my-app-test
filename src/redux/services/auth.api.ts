import { baseApi } from './base.api';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}

interface RefreshTokenRequest {
  refreshToken: string | null;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: body => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
