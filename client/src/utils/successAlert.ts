import { toast } from "react-toastify";

export const successAlert = () => {
  toast.success("🦄 Wow so easy!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
