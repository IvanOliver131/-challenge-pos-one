import { toast } from "react-toastify";

export function useToast() {
  const success = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  return { success, notifyError };
}
