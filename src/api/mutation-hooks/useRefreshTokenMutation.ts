import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../client';

export interface RefreshTokenRequest {
  refreshToken: string;
  expiresInMins?: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const useRefreshTokenMutation = (options?: {
  onMutate?: () => void;
  onSuccess?: (data: RefreshTokenResponse) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: async (body: RefreshTokenRequest) => {
      const response = await apiFetch<RefreshTokenResponse>('/auth/refresh', {
        method: 'POST',
        data: body,
      });
      return response;
    },
    ...options,
  });
};
