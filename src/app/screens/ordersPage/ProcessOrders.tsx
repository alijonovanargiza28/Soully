import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";
import { mediaUrl } from "../../../lib/media";

import { createSelector } from "reselect";
import { retriveProcessOrders } from "./selector";

import { Messages } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";

import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobal } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const processOrderRetriever = createSelector(retriveProcessOrders, (processOrders) => ({
  processOrders,
}));

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;

  const { authMember, setOrderBuilder } = useGlobal();

  const { processOrders } = useSelector(processOrderRetriever);

  const finishOrderHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (!authMember) {
        throw new Error(Messages.error2);
      }

      const orderId = e.currentTarget.value;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");

      if (confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);

        setValue("3");

        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2" className="order-tab-panel">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
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
                      <img
                        src={imagePath}
                        className="order-product-img"
                        alt={product.productName}
                      />

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

                <p className="data-compl">{moment(order.updatedAt).format("DD MMM YYYY")}</p>

                <Button
                  value={order._id}
                  variant="contained"
                  className="verify-button"
                  onClick={finishOrderHandler}
                >
                  Received
                </Button>
              </Box>
            </Box>
          );
        })}

        {(!processOrders || processOrders.length === 0) && (
          <Box className="empty-orders">
            <img src="/icons/noimage-list.svg" alt="No orders" />

            <p>No processing orders yet</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
