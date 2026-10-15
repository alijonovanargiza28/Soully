import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

// REACT APP STATE
export interface AppRootState {
  productsPage: ProductsPageState;
  homePage: HomePageState;
  ordersPage: OrdersPageState;
}

// HOMEPAGE
export interface HomePageState {
  bestSellers: Product[];
  newArrivals: Product[];
}

// PRODUCT PAGE
export interface ProductsPageState {
  seller: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

// ORDERS PAGE
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
