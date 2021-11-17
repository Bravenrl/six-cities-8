import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, TestID, TestReg } from '../../const';
import App from './app';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { MapClass } from '../../class-const';
import { fakeUser, GenerateFakeOffer, offersFavoriteParis, fakeCity } from '../../mock/mock';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();


const componentState = {
  DATA: {
    ...MockDATA,
    offers: offersFavoriteParis,
    currentOffer: GenerateFakeOffer(),
    favoriteOffers: offersFavoriteParis,
    userEmail: fakeUser.email,
    nearbyOffers: offersFavoriteParis,
  },
  USER: {
    ...MockUSER,
    city: fakeCity,
    authorizationStatus: AuthorizationStatus.Auth,
  },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>);

describe('Application Routing', () => {
  it('should render MainPage when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.MainPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.MapSection)).toHaveClass(MapClass.Main);
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    const noAuthState = {
      ...componentState,
      USER: {
        ...MockUSER,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    };
    const store = mockStore(noAuthState);
    renderComponent(store);
    expect(screen.getByText(TestReg.LoginEmail)).toBeInTheDocument();
    expect(screen.getByText(TestReg.LoginPassword)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(TestReg.LoginButton);
  });

  it('should render PropertyPage when user navigate to "/offer:id"', () => {
    history.push(AppRoute.RoomProprety);
    const dispatch = jest.fn();
    window.scrollTo = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.PropertyPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.MapSection)).toHaveClass(MapClass.Property);
  });

  it('should render FavoritesPage when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.FavoritePage)).toBeInTheDocument();
  });

  it('should render NotFound when user navigate to non-existent route', () => {
    history.push(AppRoute.NotFound);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.BackToRoot)).toBeInTheDocument();
  });

  it('should render preloader if AuthUnknown&Loading', () => {
    const unknownAuthState = {
      ...componentState,
      USER: {
        ...MockUSER,
        authorizationStatus: AuthorizationStatus.Unknown,
      },
      APP: { ...MockAPP, isLoading: true },
    };
    const store = mockStore(unknownAuthState);
    history.push(AppRoute.Root);
    renderComponent(store);
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });
});
