
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AppRoute, AuthorizationStatus } from '../const';
import { adaptAuthInfoToClient, adaptOfferToCient } from '../services/adapter';
import { ApiRoute, ToastMessage } from '../services/const';
import { createToast } from '../services/toast';
import { removeToken, setToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { ServerOfferType } from '../types/offer';
import { ServerAurhInfo, User } from '../types/review';
import { toggleIsLoading, loadOffers, requireAuthorization, setAuthor, requireLogout, redirectToRoute } from './action';

export const loadOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    try {
      const { data } = await api.get<ServerOfferType[]>(ApiRoute.Offers);
      const offers = data.map(adaptOfferToCient);
      dispatch(loadOffers(offers));
    } catch {
      toast.warning(ToastMessage.LoadFiail);
    }
    dispatch(toggleIsLoading(false));
  };

export const checkAuthStatusAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<ServerAurhInfo>(ApiRoute.Login)
      .then((response) => {
        const author = adaptAuthInfoToClient(response.data);
        setToken(author.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(setAuthor(author));
      })
      .catch((err: AxiosError) => createToast(err.response?.status));
  };

export const loginAction = (user: User): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    await api.post<ServerAurhInfo>(ApiRoute.Login, user)
      .then((response) => {
        const author = adaptAuthInfoToClient(response.data);
        setToken(author.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(setAuthor(author));
        dispatch(redirectToRoute(AppRoute.Root));
      })
      .catch((err: AxiosError) => createToast(err.response?.status));
    dispatch(toggleIsLoading(false));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(ApiRoute.Logout)
      .then(() => {
        removeToken();
        dispatch(requireLogout());
        dispatch(redirectToRoute(AppRoute.Root));
      })
      .catch((err: AxiosError) => createToast(err.response?.status));
  };
