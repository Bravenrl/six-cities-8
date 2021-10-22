import { offers } from '../mocks/offers';
import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { getCurrentOffers } from '../utils';

const INITIAL_CITY = 'Paris';

const initialState = {
  city: INITIAL_CITY,
  offers: getCurrentOffers(offers, INITIAL_CITY),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.AddOffers:
      return {...state, offers: getCurrentOffers(action.payload, state.city)};
    default:
      return state;
  }
};

export {reducer};
