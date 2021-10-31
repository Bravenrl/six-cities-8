import { toast } from 'react-toastify';
import { HttpCode, ToastMessage } from './const';


export const createToast = (status: number | undefined): void => {
  if (status === undefined) {
    toast.error(ToastMessage.NetworkErr);
  }
  if (status === HttpCode.Unauthorised) {
    toast.warning(ToastMessage.Unauthorised);
  }
  if (status === HttpCode.BadRequest) {
    toast.warning(ToastMessage.ВadRequest);
  }
  if (status === HttpCode.NotFound) {
    toast.warning(ToastMessage.NotFound);
  }
};

