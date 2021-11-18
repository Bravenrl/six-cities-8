import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { fakeCity, offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Route, Router} from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { AppRoute, TestReg } from '../../const';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import withPreloader from './with-preloader';

const mockStore = configureMockStore();
const history = createMemoryHistory();


const componentState = {
  DATA: { ...MockDATA, favoriteOffers: [...offersFavoriteParis, ...offersFavoriteAmsterdan] },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};

const ComponentWrapped = withPreloader(FavoritesItems);

const renderComponent = (store: MockStore) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path={AppRoute.Favorites}>
          <ComponentWrapped city={fakeCity}/>
        </Route>
      </Router>
    </Provider>);

describe('HOC: withPreloader', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });
  it('base component with props should correct rendering when use with HOC & Preloader should not render', () => {
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(TestReg.FakeCity)).toBeInTheDocument();
    expect(screen.queryByAltText(TestReg.Preloader)).not.toBeInTheDocument();
  });

  it('HOC should correct rendering when isLoading', () => {
    const loadingState = {
      ...componentState,
      APP: { ...MockAPP, isLoading: true },
    };
    const store = mockStore(loadingState);
    renderComponent(store);
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(TestReg.FakeCity)).toBeInTheDocument();
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });

  it('HOC should correct rendering when isPosting', () => {
    const loadingState = {
      ...componentState,
      APP: { ...MockAPP, isPosting: true },
    };
    const store = mockStore(loadingState);
    renderComponent(store);
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(TestReg.FakeCity)).toBeInTheDocument();
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });
});
