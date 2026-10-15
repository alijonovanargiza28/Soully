import axios from "axios";
/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const errorMessage = (error: unknown): string => {
  let message = Messages.error1;
  if (typeof error === "string") message = error;
  else if (error instanceof Error) message = error.message;
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown } | undefined;
    if (typeof data?.message === "string") message = data.message;
  }
  return message;
};

export const sweetErrorHandling = async (error: unknown) => {
  await Swal.fire({ icon: "error", text: errorMessage(error), showConfirmButton: true });
};

export const sweetTopSuccessAlert = async (msg: string, duration: number = 2000) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (msg: string, duration: number = 2000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = "",
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
