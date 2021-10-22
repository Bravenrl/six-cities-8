import {OfferType} from './offer';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  AddOffers = 'main/addOffers',
}

export type ChangeCityActionType = {
  type: ActionType.ChangeCity;
  payload: string;
}

export type AddOffersActionType = {
  type: ActionType.AddOffers;
  payload: OfferType[];
}

export type Actions = ChangeCityActionType | AddOffersActionType
