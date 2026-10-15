import { useEffect, useState } from "react";
import { CartItem } from "../../lib/types/search";

export function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("cartData") || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is CartItem =>
        item &&
        typeof item._id === "string" &&
        typeof item.name === "string" &&
        typeof item.image === "string" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

const useBasket = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);
  useEffect(() => {
    try {
      if (cartItems.length) localStorage.setItem("cartData", JSON.stringify(cartItems));
      else localStorage.removeItem("cartData");
    } catch {
      // The cart remains available when browser storage is disabled or full.
    }
  }, [cartItems]);

  const onAdd = (input: CartItem) =>
    setCartItems((items) => {
      const exists = items.some((item) => item._id === input._id);
      return exists
        ? items.map((item) =>
            item._id === input._id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { ...input, quantity: 1 }];
    });
  const onRemove = (input: CartItem) =>
    setCartItems((items) =>
      items
        .map((item) => (item._id === input._id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  const onDelete = (input: CartItem) =>
    setCartItems((items) => items.filter((item) => item._id !== input._id));
  const onDeleteAll = () => setCartItems([]);
  return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};
export default useBasket;
