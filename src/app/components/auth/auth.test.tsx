import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Member } from "../../../lib/types/member";
import { GlobalContext } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";
import AuthenticationModal from "./index";

afterEach(() => jest.restoreAllMocks());
function mountLogin() {
  const close = jest.fn();
  render(
    <GlobalContext.Provider
      value={{
        authMember: null,
        authLoading: false,
        setAuthMember: jest.fn(),
        orderBuilder: new Date(),
        setOrderBuilder: jest.fn(),
      }}
    >
      <AuthenticationModal
        signupOpen={false}
        loginOpen
        handleLoginClose={close}
        handleSignupClose={jest.fn()}
      />
    </GlobalContext.Provider>,
  );
  fireEvent.change(screen.getByLabelText("username"), { target: { value: "flower-user" } });
  fireEvent.change(screen.getByLabelText("password"), { target: { value: "password123" } });
  return close;
}
test("login works with username/password only and blocks duplicate clicks", async () => {
  const login = jest
    .spyOn(MemberService.prototype, "login")
    .mockResolvedValue({ _id: "member" } as Member);
  const close = mountLogin();
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledWith({ memberNick: "flower-user", memberPassword: "password123" });
});
test("bad credentials stay visible inside the login form", async () => {
  jest.spyOn(MemberService.prototype, "login").mockRejectedValue(new Error("Wrong password"));
  const close = mountLogin();
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Wrong password");
  expect(close).not.toHaveBeenCalled();
});
