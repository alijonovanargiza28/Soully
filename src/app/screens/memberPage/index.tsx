import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Container, Stack } from "@mui/material";
import { Redirect } from "react-router-dom";
import "../../../css/userPage.css";
import { MemberType } from "../../../lib/enums/member.enum";
import { mediaUrl } from "../../../lib/media";
import { useGlobal } from "../../hooks/useGlobals";
import { Settings } from "./Settings";

export default function UserPage() {
  const { authMember, authLoading } = useGlobal();

  if (authLoading) return <Box role="status">Loading your account...</Box>;
  if (!authMember) return <Redirect to="/" />;
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <div className={"order-user-img"}>
                  <img
                    alt="Profile"
                    src={
                      authMember?.memberImage
                        ? mediaUrl(authMember.memberImage)
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      alt="Profile"
                      src={
                        authMember?.memberType === MemberType.SELLER
                          ? "/icons/seller.svg"
                          : "/icons/user-badge.svg"
                      }
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>{authMember?.memberNick}</span>
                <span className={"order-user-prof"}>{authMember?.memberType}</span>
                <span className={"order-user-prof"}>
                  {authMember?.memberAdress ? authMember.memberAdress : "no address"}
                </span>
              </Box>
              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>
              <p className={"user-desc"}>
                {authMember?.memberDesc ? authMember.memberDesc : "no description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
