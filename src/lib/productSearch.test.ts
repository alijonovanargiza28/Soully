import { ProductCollection } from "./enums/product.enum";
import { parseProductSearch, productSearchUrl } from "./productSearch";

test("opening Products defaults to every active category", () => {
  expect(parseProductSearch("")).toEqual({ page: 1, limit: 8, order: "createdAt", search: "" });
});
test("category, search, sorting and pagination survive refresh", () => {
  const input = {
    page: 3,
    limit: 8,
    order: "productPrice",
    productCollection: ProductCollection.WEDDING_BOUQUET,
    search: "Rose & lily",
  };
  expect(parseProductSearch(productSearchUrl(input).split("?")[1])).toEqual(input);
});
test("All clears a category and invalid URL values safely return to defaults", () => {
  expect(
    productSearchUrl({
      ...parseProductSearch("?productCollection=WEDDING_BOUQUET"),
      productCollection: undefined,
    }),
  ).toBe("/products");
  expect(parseProductSearch("?productCollection=invalid&page=-1&order=invalid")).toEqual(
    parseProductSearch(""),
  );
  expect(parseProductSearch("?productCollection=WEDDING").productCollection).toBe(
    ProductCollection.WEDDING_BOUQUET,
  );
});
