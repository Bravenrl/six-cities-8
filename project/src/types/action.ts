import { addOffers, changeCity, changeSorting } from '../store/action';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  AddOffers = 'main/addOffers',
  ChangeSorting = 'option/changeSorting',
}

export type Actions =
  | ReturnType <typeof changeCity>
  | ReturnType <typeof addOffers>
  | ReturnType <typeof changeSorting>;

