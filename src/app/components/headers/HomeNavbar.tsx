import { Logout } from "@mui/icons-material";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { mediaUrl } from "../../../lib/media";
import { CartItem } from "../../../lib/types/search";
import { useGlobal } from "../../hooks/useGlobals";
import Basket from "./Basket";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobal();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        {/* NAVBAR */}
        <Stack className="menu">
          {/* LOGO */}
          <NavLink to="/">
            <img className="brand-logo" src="/img/logoo.png" alt="Soully" />
          </NavLink>

          {/* LINKS */}
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>

            <Box className="hover-line">
              <NavLink to="/about" activeClassName="underline">
                About
              </NavLink>
            </Box>

            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>

            {authMember && (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            )}

            {authMember && (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            )}

            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            {/* BASKET */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/* LOGIN / USER */}
            {!authMember ? (
              <Button
                variant="contained"
                className="login-button"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember.memberImage
                    ? mediaUrl(authMember.memberImage)
                    : "/icons/default-user.svg"
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.currentTarget.click();
                  }
                }}
                onClick={handleLogoutClick}
                alt="User"
              />
            )}

            {/* LOGOUT MENU */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        {/* HERO */}
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">
              The Finest Flowers,
              <br />
              Made With Love
            </Box>

            <Box className="wel-txt">The Choice, Beyond a Choice.</Box>

            <Box className="service-txt">24 hours service</Box>

            <Box className="signup">
              {!authMember && (
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              )}
            </Box>
          </Stack>

          <Box className="logo-frame">
            <div className="logo-img" />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
