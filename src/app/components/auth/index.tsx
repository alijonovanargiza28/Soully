import LoginIcon from "@mui/icons-material/Login";
import { Fab, Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Messages } from "../../../lib/config";
import { errorMessage } from "../../../lib/sweetAlert";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { useGlobal } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
  @media (max-width: 600px) {
    display: none;
  }
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobal();
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    setMemberPassword("");
  }, [signupOpen, loginOpen]);

  /** HANDLERS **/
  const handleUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };
  const handleSignupRequest = async () => {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError("");
    try {
      const isFulfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      busy.current = false;
      setPending(false);
    }
  };
  const handleLoginRequest = async () => {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError("");
    try {
      const isFulfill = memberNick.trim() !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      busy.current = false;
      setPending(false);
    }
  };
  return (
    <div>
      <Modal
        aria-label="Soully authentication"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction={"row"}
            sx={{
              width: "800px",
              maxWidth: "calc(100vw - 32px)",
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 5,
              p: 2,
            }}
          >
            <ModalImg src={"/img/login.jpg"} alt="Soully flowers" />
            <Stack sx={{ marginLeft: { xs: "0", md: "69px" }, alignItems: "center", flex: 1 }}>
              <h2 id="signup-title">Signup Form</h2>
              {error && <p role="alert">{error}</p>}
              <TextField
                sx={{ marginTop: "7px" }}
                id="signup-username"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="signup-phone"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="signup-password"
                type="password"
                autoComplete="new-password"
                label="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                disabled={pending}
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-label="Soully authentication"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            direction={"row"}
            sx={{
              width: "700px",
              maxWidth: "calc(100vw - 32px)",
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 5,
              p: 2,
            }}
          >
            <ModalImg src={"/img/login.jpg"} alt="Soully flowers" />
            <Stack
              sx={{
                marginLeft: { xs: "0", md: "35px" },
                flex: 1,
                marginTop: "5px",
                alignItems: "center",
              }}
            >
              <h2 id="login-title">Login Form</h2>
              {error && <p role="alert">{error}</p>}
              <TextField
                id="login-username"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id="login-password"
                autoComplete="current-password"
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                disabled={pending}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
