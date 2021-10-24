import { SortType } from '../const';
import { offers } from '../mocks/offers';
import { getSortedOffers } from '../sorting';
import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';

const INITIAL_CITY = 'Paris';

export const initialState = {
  city: INITIAL_CITY,
  offers: offers,
  sortType: SortType.Popular,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.AddOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeSorting:
      return {...state,
        offers: getSortedOffers(state.offers, action.payload),
        sortType: action.payload};
    default:
      return state;
  }
};

export {reducer};
