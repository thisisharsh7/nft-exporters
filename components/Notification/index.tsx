import React from "react";
import { ToastContainer, toast, Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Notification() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={false}
    />
  );
}

export const customPromiseToast = (
  message: string,
  type: "success" | "loading" | "error",
  toastId?: Id
) => {
  try {
    const settings = {
      isLoading: false,
      autoClose: 5000,
      closeOnClick: true,
    };

    if (type === "loading") {
      const toastId = toast.loading(message);
      return toastId;
    } else if (type === "success") {
      if (!toastId) {
        throw new Error("toastId not passed as argument");
      }
      toast.update(toastId, {
        render: message,
        type: "success",
        ...settings,
      });
    } else if (type === "error") {
      if (!toastId) {
        throw new Error("toastId not passed as argument");
      }
      toast.update(toastId, {
        render: message,
        type: "error",
        ...settings,
      });
    } else {
      throw new Error("Wrong customPromiseToast type");
    }
  } catch (error: any) {
    console.error("customPromiseToast =>", error.message);
    return false;
  }
};
