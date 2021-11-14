import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { CITIES, offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { mockInitialStore } from '../../mock/mockStore';
import CitiesContainer from './cities-container';

const altText = 'Place';
const city = CITIES[0];
const CityText = new RegExp(`${offersFavoriteParis.length} places to stay in ${city}`, 'i');
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CitiesContainer', () => {

  it('should render correctly', () => {
    const componentStore = {...mockInitialStore};
    componentStore.DATA.offers = [...offersFavoriteParis, ...offersFavoriteAmsterdan];
    const store = mockStore(componentStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesContainer city = {city}/>
        </Router>
      </Provider>,
    );
    expect(screen.getAllByAltText(altText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(CityText)).toBeInTheDocument();
  });
});
