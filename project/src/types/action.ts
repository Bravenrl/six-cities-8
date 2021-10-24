import { addOffers, changeCity } from '../store/action';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  AddOffers = 'main/addOffers',
}

export type Actions =
  | ReturnType <typeof changeCity>
  | ReturnType <typeof addOffers>;

