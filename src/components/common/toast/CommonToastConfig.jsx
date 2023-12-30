import { toast } from "react-toastify";

const commonToastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...commonToastConfig,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...commonToastConfig,
  });
};
