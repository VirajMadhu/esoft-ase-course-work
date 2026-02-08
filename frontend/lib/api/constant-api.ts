import api from "@/lib/api/axios";
import { Category, SortOption } from "@/types";

export async function getConstants(): Promise<{
  categories: Category[];
  sortOptions: SortOption[];
}> {
  const { data } = await api.get("/constants");

  return data;
}

