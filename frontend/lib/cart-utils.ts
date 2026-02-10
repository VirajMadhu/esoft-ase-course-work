import { CartItem, Product } from "@/types";

const CART_STORAGE_KEY = "islandlink_cart";

export const getCart = (): CartItem[] => {
  if (typeof globalThis.window === "undefined") return [];
  const storedCart = globalThis.window.sessionStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof globalThis.window === "undefined") return;
  globalThis.window.sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product): CartItem[] => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: `cart-${Date.now()}`,
      productId: product.id,
      name: product.name,
      unit: product.unit,
      quantity: 1,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  }

  saveCart(cart);
  return cart;
};

export const updateQuantity = (productId: number, delta: number): CartItem[] => {
  let cart = getCart();
  const itemIndex = cart.findIndex((item) => item.productId === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart = cart.filter((item) => item.productId !== productId);
    }
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: number): CartItem[] => {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
  return cart;
};

export const clearCart = (): void => {
  if (typeof globalThis.window === "undefined") return;
  globalThis.window.sessionStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartSubtotal = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getCartTotal = (): number => {
  const cartTotal = getCartSubtotal();
  const logisticsFee = 0;
  return cartTotal + logisticsFee;
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};
