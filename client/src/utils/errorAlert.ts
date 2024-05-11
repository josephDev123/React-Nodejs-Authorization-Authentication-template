import { toast } from "react-toastify";

export const errorAlert = (msg: any) => {
  toast.error(`${msg}`, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
