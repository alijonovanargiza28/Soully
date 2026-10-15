import LocationOnIcon from "@mui/icons-material/LocationOn";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useEffect, useState } from "react";
import { mediaUrl } from "../../../lib/media";

import FinishedOrders from "./FinishedOrders";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";

import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";

import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { OrderInquiry } from "../../../lib/types/order";
import { useGlobal } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

import "../../../css/order.css";

import { Redirect } from "react-router-dom";
import { MemberType } from "../../../lib/enums/member.enum";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const { orderBuilder, authMember, authLoading } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [value, setValue] = useState("1");

  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    if (!authMember) return;
    let active = true;
    setLoading(true);
    setError("");
    const service = new OrderService();
    Promise.all(
      [OrderStatus.PAUSE, OrderStatus.PROCESS, OrderStatus.FINISH].map((orderStatus) =>
        service.getMyOrders({ ...orderInquiry, orderStatus }),
      ),
    )
      .then(([paused, processing, finished]) => {
        if (!active) return;
        dispatch(setPausedOrders(paused));
        dispatch(setProcessOrders(processing));
        dispatch(setFinishedOrders(finished));
      })
      .catch(() => {
        if (active) setError("Your orders could not be loaded. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [orderInquiry, orderBuilder, dispatch, authMember, retry]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (authLoading) return <Box role="status">Loading your account...</Box>;
  if (!authMember) {
    return <Redirect to="/" />;
  }

  if (loading) return <Box role="status">Loading your orders...</Box>;
  if (error)
    return (
      <Box role="alert">
        {error}
        <button onClick={() => setRetry((value) => value + 1)}>Retry</button>
      </Box>
    );

  return (
    <div className="order-page">
      <Container className="order-container">
        {/* LEFT SIDE */}

        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Tabs value={value} onChange={handleChange} className="order-tabs">
                <Tab label="Paused" value="1" />

                <Tab label="Processing" value="2" />

                <Tab label="Finished" value="3" />
              </Tabs>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />

              <ProcessOrders setValue={setValue} />

              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* RIGHT SIDE */}

        <Stack className="order-right">
          {/* USER CARD */}

          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src={
                    authMember.memberImage
                      ? mediaUrl(authMember.memberImage)
                      : "/icons/default-user.svg"
                  }
                  className="order-user-avatar"
                  alt="user"
                />

                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember.memberType === MemberType.SELLER
                        ? "/icons/seller.svg"
                        : "/icons/user-badge.svg"
                    }
                    className="order-user-prof-img"
                    alt="profile"
                  />
                </div>
              </div>

              <span className="order-user-name">{authMember.memberNick}</span>

              <span className="order-user-prof">{authMember.memberType}</span>
            </Box>

            <Box className="liner" />

            <Box className="order-user-address">
              <LocationOnIcon />

              <div className="spec-address-txt">
                {authMember.memberAdress ? authMember.memberAdress : "Address not available"}
              </div>
            </Box>
          </Box>

          {/* PAYMENT CARD */}

          <Box className="order-info-box payment-box">
            <h3 className="payment-title">Payment Method</h3>

            <p className="payment-subtitle">Add your card details</p>

            <input type="text" name="cardNumber" placeholder="Card number" className="card-input" />

            <div className="card-row">
              <input
                type="text"
                name="cardPeriod"
                placeholder="MM / YY"
                className="card-half-input"
              />

              <input type="text" name="cardCVV" placeholder="CVV" className="card-half-input" />
            </div>

            <input
              type="text"
              name="cardCreator"
              placeholder="Card holder name"
              className="card-input"
            />

            <div className="cards-box">
              <img src="/icons/western-card.svg" alt="card" />

              <img src="/icons/master-card.svg" alt="mastercard" />

              <img src="/icons/paypal-card.svg" alt="paypal" />

              <img src="/icons/visa-card.svg" alt="visa" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
