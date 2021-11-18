import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { cleanup, render, screen } from '@testing-library/react';
import { offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { TestReg } from '../../const';
import FavoritesPage from './favorites-page';
import { loadFavoriteOffersAction } from '../../store/api-action';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';


jest.mock('../../store/api-action');
const fakeLoadFavoriteOffersAction = loadFavoriteOffersAction as jest.MockedFunction<typeof loadFavoriteOffersAction>;


const mockStore = configureMockStore();
const history = createMemoryHistory();

const componentState = {
  DATA: { ...MockDATA, favoriteOffers: [...offersFavoriteParis, ...offersFavoriteAmsterdan] },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    <Router history={history}>
      <FavoritesPage />
    </Router>
  </Provider>);

describe('Component: FavoritesPage', () => {
  const dispatch = jest.fn();
  const useDispatch = jest.spyOn(Redux, 'useDispatch');

  it('should render correctly and offers exist', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length + offersFavoriteAmsterdan.length);
    expect(screen.getByText(TestReg.FavoritePage)).toBeInTheDocument();
    expect(fakeLoadFavoriteOffersAction).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    useDispatch.mockClear();
  });

  it('should render correctly and offers non exist', () => {
    useDispatch.mockReturnValue(dispatch);
    const emptyState = {
      ...componentState,
      DATA: { ...MockDATA },
    };
    const store = mockStore(emptyState);
    renderComponent(store);
    expect(screen.getByText(TestReg.FavoriteEmptyFirst)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FavoriteEmptySecond)).toBeInTheDocument();
    expect(fakeLoadFavoriteOffersAction).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);

  });

  it('should dispatch removeFavoriteOffers when Component willUnmount', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(fakeLoadFavoriteOffersAction).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    cleanup();
    expect(dispatch).toHaveBeenLastCalledWith({type: ActionType.RemoveFavoriteOffers});
    useDispatch.mockClear();
  });
});

