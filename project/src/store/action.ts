import { ActionType} from '../types/action';
import { OfferType } from '../types/offer';

export const changeCity = (cityName: string) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const addOffers = (offers: OfferType[]) => ({
  type: ActionType.AddOffers,
  payload: offers,
} as const);

