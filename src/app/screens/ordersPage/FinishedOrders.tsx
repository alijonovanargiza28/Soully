import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import { mediaUrl } from "../../../lib/media";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { retriveFinishedOrders } from "./selector";

import { Product } from "../../../lib/types/product";

import { Order, OrderItem } from "../../../lib/types/order";

const finishedOrderRetriever = createSelector(retriveFinishedOrders, (finishedOrders) => ({
  finishedOrders,
}));

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrderRetriever);

  return (
    <TabPanel value="3" className="order-tab-panel">
      <Stack>
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} className="order-main-box finished-order">
            <Box className="order-box-scroll">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order?.productData?.filter(
                  (ele: Product) => item.productId === ele._id,
                )[0]!;

                if (!product) return null;

                const imagePath = mediaUrl(product.productImages[0]);

                return (
                  <Box key={item._id} className="orders-name-price">
                    <img src={imagePath} className="order-product-img" alt={product.productName} />

                    <p className="product-title">{product.productName}</p>

                    <Box className="price-box">
                      <p>${item.itemPrice}</p>

                      <span>×</span>

                      <p>{item.itemQuantity}</p>

                      <strong>${item.itemQuantity * item.itemPrice}</strong>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className="total-price-box">
              <Box className="box-total">
                <div>
                  <span>Subtotal</span>
                  <strong>${order.orderTotal - order.orderDelivery}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>${order.orderDelivery}</strong>
                </div>

                <div className="total-final">
                  <span>Total</span>
                  <strong>${order.orderTotal}</strong>
                </div>
              </Box>

              <span className="finished-badge">✓ Completed</span>
            </Box>
          </Box>
        ))}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box className="empty-orders">
            <img src="/icons/noimage-list.svg" alt="No orders" />

            <p>No completed orders yet</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
