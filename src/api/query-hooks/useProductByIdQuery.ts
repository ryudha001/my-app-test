import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../client';
import { Product } from '../types';

export const useProductByIdQuery = (
  id: number,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onSettled?: () => void;
  },
) => {
  return useQuery<Product>({
    queryKey: ['product', id], // unik per product
    queryFn: async () => {
      const response = await apiFetch<Product>(`/products/${id}`);
      return response;
    },
    ...options,
  });
};
