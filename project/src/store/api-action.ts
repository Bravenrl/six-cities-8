import { ApiRoute } from '../const';
import { adaptOfferToCient } from '../services/adapter';
import { ThunkActionResult } from '../types/action';
import { ServerOfferType } from '../types/offer';
import { toggleIsLoading, loadOffers } from './action';

export const loadOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(toggleIsLoading(true));
    const {data} = await api.get<ServerOfferType[]>(ApiRoute.Offers);
    const offers = data.map(adaptOfferToCient);
    dispatch(loadOffers(offers));
    dispatch(toggleIsLoading(false));
  };

