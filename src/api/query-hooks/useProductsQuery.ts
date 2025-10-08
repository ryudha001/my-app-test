import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../client';
import { Product } from '../types';

export const useProductsQuery = (
  options?: {
    enabled?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onSettled?: () => void;
  },
  request?: {
    headers?: Record<string, string>;
  },
) => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await apiFetch<{ products: Product[] }>('/products', {
        headers: request?.headers,
      });

      return data.products;
    },
    ...options,
  });
};
