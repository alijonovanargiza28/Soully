import { ProductCollection } from "../enums/product.enum";
export interface Occasion {
  _id: string;
  occasionTitle: string;
  occasionDescription: string;
  occasionImage: string;
  productCollection: ProductCollection;
}
