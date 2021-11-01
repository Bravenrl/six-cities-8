
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AppRoute, AuthorizationStatus } from '../const';
import { adaptAuthInfoToClient, adaptOfferToCient, adaptReviewToCient } from '../services/adapter';
import { ApiRoute, HttpCode, ToastMessage } from '../services/const';
import { createToast } from '../services/toast';
import { removeToken, setToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { ServerOfferType } from '../types/offer';
import { ServerAurhInfo, ServerReviewType, User } from '../types/review';
import { toggleIsLoading, loadOffers, requireAuthorization, setAuthor, requireLogout, redirectToRoute, loadCurrentOffer, loadNearbyOffers, loadReviews } from './action';

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

export const loadPropertyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    const getCurrentOffer = (): Promise<AxiosResponse> =>
      api.get<ServerOfferType>(ApiRoute.CurrentOffer + id);
    const getNearbyOffers = (): Promise<AxiosResponse> =>
      api.get<ServerOfferType[]>(ApiRoute.CurrentOffer + id + ApiRoute.NearbyOffers);
    const getReviews = (): Promise<AxiosResponse> =>
      api.get<ServerReviewType[]>(ApiRoute.Reviews + id);
    await axios.all<AxiosResponse>([getCurrentOffer(), getNearbyOffers(), getReviews()])
      .then(axios.spread((current, nearby, reviews) => {
        const offer = adaptOfferToCient(current.data);
        const offers = nearby.data.map(adaptOfferToCient);
        const comments = reviews.data.map(adaptReviewToCient);
        dispatch(loadNearbyOffers(offers));
        dispatch(loadCurrentOffer(offer));
        dispatch(loadReviews(comments));
      }))
      .catch((err: AxiosError) => {
        createToast(err.response?.status);
        if (err.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      });
    dispatch(toggleIsLoading(false));
  };

