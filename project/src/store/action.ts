import { SortType} from '../const';
import { ActionType} from '../types/action';
import { OfferType } from '../types/offer';

export const changeCity = (cityName: string) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const loadOffers = (offers: OfferType[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const changeSorting = (option: SortType) => ({
  type: ActionType.ChangeSorting,
  payload: option,
} as const);

