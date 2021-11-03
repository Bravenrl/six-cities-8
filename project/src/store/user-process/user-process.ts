import { AuthorizationStatus, INITIAL_CITY, SortType } from '../../const';
import { Actions, ActionType } from '../../types/action';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  city: INITIAL_CITY,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = (state = initialState, action: Actions): UserProcess => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.ChangeSorting:
      return { ...state, sortType: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {userProcess};
