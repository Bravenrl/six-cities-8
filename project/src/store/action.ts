import { ActionType, AddOffersActionType, ChangeCityActionType } from '../types/action';
import { OfferType } from '../types/offer';

export const changeCity = (cityName: string) : ChangeCityActionType => ({
  type: ActionType.ChangeCity,
  payload: cityName,
});

export const addOffers = (offers: OfferType[]) : AddOffersActionType => ({
  type: ActionType.AddOffers,
  payload: offers,
});

