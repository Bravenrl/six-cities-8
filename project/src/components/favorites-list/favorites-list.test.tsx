import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { CITIES, offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { mockInitialStore } from '../../mock/mockStore';

const altText = 'Place';
const favoriteTitle = 'Saved listing';
const titleText = new RegExp(`${favoriteTitle}`, 'i');
const notExpectCityText = new RegExp(`${CITIES[1]}`, 'i');
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FavoritesList', () => {

  it('should render correctly', () => {
    const componentStore = {...mockInitialStore};
    componentStore.DATA.favoriteOffers = [...offersFavoriteParis, ...offersFavoriteAmsterdan];
    const store = mockStore(componentStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByAltText(altText).length).toBe(offersFavoriteParis.length + offersFavoriteAmsterdan.length);
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectCityText)).not.toBeInTheDocument();
  });
});
