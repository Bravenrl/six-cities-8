import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { TestReg } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FavoritesList', () => {

  it('should render correctly', () => {
    const componentState = {
      DATA: {...MockDATA, favoriteOffers: [...offersFavoriteParis, ...offersFavoriteAmsterdan]},
      USER: {...MockUSER},
      APP: {...MockAPP},
    };
    const store = mockStore(componentState);
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length + offersFavoriteAmsterdan.length);
    expect(screen.getByText(TestReg.FavoritePage)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.NonExpectCity)).not.toBeInTheDocument();
  });
});
