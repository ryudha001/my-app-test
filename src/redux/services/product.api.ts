import { baseApi } from './base.api';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  thumbnail: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (response: { products: any[] }) =>
        response.products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          brand: product.brand,
          thumbnail: product.thumbnail,
        })),
    }),
    getProductById: builder.query({
      query: (id: number) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
