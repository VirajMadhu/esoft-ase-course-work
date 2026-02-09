import api from "@/lib/api/axios";
import { Product } from "@/types";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  category?: number;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<{
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const { data } = await api.get("/products", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 8,
      sort: params.sort,
      category: params.category,
    },
  });

  return data;
}

