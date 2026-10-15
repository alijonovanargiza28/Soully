import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Messages } from "../../../lib/config";
import { mediaUrl } from "../../../lib/media";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { CartItem } from "../../../lib/types/search";
import { useGlobal } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobal();
  const history = useHistory();
  const busy = useRef(false);
  const [ordering, setOrdering] = useState(false);
  const itemPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );

  const shippingCost: number = itemPrice < 100 ? 5 : 0;
  const totalPrice = (itemPrice + shippingCost).toFixed(2);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    if (busy.current || !cartItems.length) return;
    busy.current = true;
    setOrdering(true);
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());

      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err).then();
    } finally {
      busy.current = false;
      setOrdering(false);
    }
  };

  return (
    <Box className="hover-line">
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src="/icons/shopping-cart.svg" alt="Shopping Cart" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            padding: "0 !important",
          },
        }}
        PaperProps={{
          sx: {
            minWidth: { xs: 0, sm: 450 },
            maxWidth: "calc(100vw - 32px)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className="basket-frame">
          <Box className="all-check-box">
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Cart Products:</div>
                <IconButton size="small" aria-label="Clear cart" onClick={onDeleteAll}>
                  <DeleteForeverIcon color="primary" />
                </IconButton>
              </Stack>
            )}
          </Box>

          <Box className="orders-main-wrapper">
            <Box className="orders-wrapper">
              {cartItems.map((item: CartItem) => {
                const imagePath = mediaUrl(item.image);

                return (
                  <Box className="basket-info-box" key={item._id}>
                    <div className="cancel-btn">
                      <IconButton
                        size="small"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => onDelete(item)}
                      >
                        <CancelIcon color="primary" />
                      </IconButton>
                    </div>

                    <img src={imagePath} alt={item.name} className="product-img" />

                    <span className="product-name">{item.name}</span>

                    <p className="product-price">
                      ${item.price} x {item.quantity}
                    </p>

                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => onAdd(item)}
                          className="add"
                        >
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Box className="basket-order">
              <span className="price">
                Total: ${totalPrice} ({itemPrice} + {shippingCost})
              </span>

              <Button
                disabled={ordering}
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant="contained"
              >
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
