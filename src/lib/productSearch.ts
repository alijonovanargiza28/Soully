import { ProductCollection } from "./enums/product.enum";
import { ProductInquery } from "./types/product";
export const productCollections = Object.values(ProductCollection);
export function parseProductSearch(search: string): ProductInquery {
  const params = new URLSearchParams(search);
  const category = params.get("productCollection");
  const normalized = category === "WEDDING" ? ProductCollection.WEDDING_BOUQUET : category;
  const page = Number(params.get("page") || 1);
  const order = params.get("order") || "createdAt";
  return {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    limit: 8,
    order: ["createdAt", "productPrice", "productViews"].includes(order) ? order : "createdAt",
    ...(productCollections.includes(normalized as ProductCollection)
      ? { productCollection: normalized as ProductCollection }
      : {}),
    search: (params.get("search") || "").slice(0, 200),
  };
}
export function productSearchUrl(input: ProductInquery): string {
  const params = new URLSearchParams();
  if (input.productCollection) params.set("productCollection", input.productCollection);
  if (input.search) params.set("search", input.search);
  if (input.order !== "createdAt") params.set("order", input.order);
  if (input.page > 1) params.set("page", String(input.page));
  return `/products${params.toString() ? `?${params}` : ""}`;
}
