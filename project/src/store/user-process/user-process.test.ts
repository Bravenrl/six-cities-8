import { AuthorizationStatus, INITIAL_CITY, SortType } from '../../const';
import { UserProcess } from '../../types/state';
import { changeCity, changeSorting, requireAuthorization, requireLogout, setCurrentId } from '../action';
import { userProcess } from './user-process';


const initialState: UserProcess = {
  city: INITIAL_CITY,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentId: null,
};

describe('Reducer: userProcess', () => {
  let state = initialState;
  beforeAll(() => state = initialState);
  it('without additional parameters should return initial state', () => {
    expect(userProcess(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
  it('should change city by changeCity', () => {
    const city = 'Paris';
    expect(userProcess(state, changeCity(city)))
      .toEqual({ ...state, city });
  });
  it('should change sortType by changeSorting', () => {
    expect(userProcess(state, changeSorting(SortType.PriceToHight)))
      .toEqual({ ...state, sortType: SortType.PriceToHight });
  });
  it('should change authorizationStatus by requireAuthorization', () => {
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({ ...state, authorizationStatus: AuthorizationStatus.Auth });
  });
  it('should change authorizationStatus to AuthorizationStatus.NoAut by requireLogout', () => {
    expect(userProcess(state, requireLogout()))
      .toEqual({ ...state, authorizationStatus: AuthorizationStatus.NoAuth });
  });
  it('should change currentId by setCurrentId', () => {
    const id = 5;
    expect(userProcess(state, setCurrentId(id)))
      .toEqual({ ...state, currentId: id });
  });
});
