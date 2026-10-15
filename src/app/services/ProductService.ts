import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquery, ProductPage } from "../../lib/types/product";

class ProductService {
  public async getProductPage(input: ProductInquery): Promise<ProductPage> {
    const { data } = await axios.get(`${serverApi}/product/all`, { params: input });
    if (!Array.isArray(data.result) || !data.pagination)
      throw new Error("The API must be restarted with the updated product pagination endpoint.");
    return { products: data.result, pagination: data.pagination };
  }
  public async getProducts(input: ProductInquery): Promise<Product[]> {
    return (await this.getProductPage(input)).products;
  }
  public async getProduct(id: string): Promise<Product> {
    const { data } = await axios.get(`${serverApi}/product/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
    return data.result ?? data;
  }
}
export default ProductService;
