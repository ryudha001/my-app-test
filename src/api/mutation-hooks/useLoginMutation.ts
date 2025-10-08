import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../client';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}

export const useLoginMutation = (options?: {
  onMutate?: () => void;
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: async (body: LoginRequest) => {
      const response = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        data: body,
      });
      return response;
    },
    ...options,
  });
};
