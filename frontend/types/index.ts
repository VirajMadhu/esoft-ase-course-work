export interface BaseCategory{
    id: number;
    name: string;
}

export interface Category extends BaseCategory {
    count: number;
}

export interface BaseProduct {
    name: string;
    category: BaseCategory;
    price: number;
    unit: string;
    image?: string | null;
}

export interface Product extends BaseProduct {
    id: number;
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    stockCount: number;
    badge?: string | null;
}

export interface SortOption {
    value: string;
    label: string;
}

export interface CartItem extends BaseProduct {
    id: string;
    productId: number;
    quantity: number;
}