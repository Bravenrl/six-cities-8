
import { AppRoute, AuthorizationStatus } from '../const';
import { adaptAuthInfoToClient, adaptOfferToCient } from '../services/adapter';
import { ApiRoute } from '../services/const';
import { removeToken, setToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { ServerOfferType } from '../types/offer';
import { ServerAurhInfo, User } from '../types/review';
import { toggleIsLoading, loadOffers, requireAuthorization, setAuthor, requireLogout, redirectToRoute } from './action';

export const loadOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    const { data } = await api.get<ServerOfferType[]>(ApiRoute.Offers);
    const offers = data.map(adaptOfferToCient);
    dispatch(loadOffers(offers));
    dispatch(toggleIsLoading(false));
  };

export const checkAuthStatusAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerAurhInfo>(ApiRoute.Login);
    if (data) {
      const author = adaptAuthInfoToClient(data);
      setToken(author.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setAuthor(author));
    }
  };

export const loginAction = (user:User): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    const {data} = await api.post<ServerAurhInfo>(ApiRoute.Login, user);
    if (data) {
      const author = adaptAuthInfoToClient(data);
      setToken(author.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setAuthor(author));
      dispatch(redirectToRoute(AppRoute.Root));
      dispatch(toggleIsLoading(false));
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(ApiRoute.Logout);
    removeToken();
    dispatch(requireLogout());
    dispatch(redirectToRoute(AppRoute.Root));
  };
