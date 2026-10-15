import { act, renderHook } from "@testing-library/react";
import useBasket, { readCart } from "./hooks/useBasket";

afterEach(() => localStorage.clear());

test("recovers from corrupt persisted cart JSON", () => {
  localStorage.setItem("cartData", "invalid JSON");
  expect(readCart()).toEqual([]);
});

test("rejects malformed and negative cart entries", () => {
  const valid = { _id: "flower", name: "Rose", image: "rose.jpg", price: 15, quantity: 2 };
  localStorage.setItem("cartData", JSON.stringify([null, {}, valid, { ...valid, quantity: -1 }]));
  expect(readCart()).toEqual([valid]);
});

test("rejects non-array persisted carts", () => {
  localStorage.setItem("cartData", JSON.stringify({ quantity: 2 }));
  expect(readCart()).toEqual([]);
});

test("rapid cart additions accumulate; decrement and delete stay consistent", () => {
  const item = { _id: "rose", name: "Rose", image: "rose.png", price: 10, quantity: 1 };
  const { result } = renderHook(() => useBasket());
  act(() => {
    result.current.onAdd(item);
    result.current.onAdd(item);
  });
  expect(result.current.cartItems[0].quantity).toBe(2);
  act(() => result.current.onRemove({ ...item, _id: "absent" }));
  expect(result.current.cartItems[0].quantity).toBe(2);
  act(() => result.current.onRemove(item));
  expect(result.current.cartItems[0].quantity).toBe(1);
  act(() => result.current.onDelete(item));
  expect(result.current.cartItems).toEqual([]);
  expect(localStorage.getItem("cartData")).toBeNull();
});
