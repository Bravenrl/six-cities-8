import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { historyBack, redirectToRoute } from '../action';
import { redirect } from './redirect';

const fakeHistory = {
  location: {
    pathname: '',
    state: [] as string [],
  },
  push(path: string) {
    this.location.state.push(this.location.pathname);
    this.location.pathname = path;
  },
  goBack() {
    this.location.pathname = this.location.state.pop() ?? '';
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('/');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
  });

  it('should not to be redirect /notfound because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.NotFound });
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.NotFound);
  });
  it('should be redirect back to /favorites', () => {
    store.dispatch(redirectToRoute(AppRoute.Favorites));
    store.dispatch(redirectToRoute(AppRoute.Login));
    store.dispatch(historyBack());
    expect(fakeHistory.location.pathname).toBe(AppRoute.Favorites);
    expect(store.getActions()).toContainEqual(historyBack());
  });
});
