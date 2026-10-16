import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { mediaUrl } from "../../../lib/media";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { retrivePausedOrders } from "./selector";

import { Messages } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";

import { MouseEvent } from "react";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

import { useGlobal } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const pausedOrdersRetriever = createSelector(retrivePausedOrders, (pausedOrders) => ({
  pausedOrders,
}));

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;

  const { authMember, setOrderBuilder } = useGlobal();

  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (!authMember) {
        throw new Error(Messages.error2);
      }

      const orderId = e.currentTarget.value;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to cancel this order?");

      if (confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);

        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (!authMember) {
        throw new Error(Messages.error2);
      }

      const orderId = e.currentTarget.value;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Confirm this order? Available stock will be reduced.");

      if (confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);

        setValue("2");

        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1" className="order-tab-panel">
      <Stack>
        {pausedOrders?.map((order: Order) => (
          <Box key={order._id} className="order-main-box">
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

              <div className="order-actions">
                <Button
                  value={order._id}
                  variant="contained"
                  className="cancel-button"
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>

                <Button
                  value={order._id}
                  variant="contained"
                  className="pay-button"
                  onClick={processOrderHandler}
                >
                  Confirm Order
                </Button>
              </div>
            </Box>
          </Box>
        ))}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box className="empty-orders">
            <img src="/icons/noimage-list.svg" alt="No orders" />

            <p>Your order list is empty</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
