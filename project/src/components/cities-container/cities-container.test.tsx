import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { fakeCity, offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import CitiesContainer from './cities-container';
import { TestReg } from '../../const';


const CityText = new RegExp(`${offersFavoriteParis.length} places to stay in ${fakeCity}`, 'i');
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CitiesContainer', () => {

  it('should render correctly', () => {
    const componentState = {
      DATA: {...MockDATA, offers: [...offersFavoriteParis, ...offersFavoriteAmsterdan]},
      USER: {...MockUSER},
      APP: {...MockAPP},
    };
    const store = mockStore(componentState);
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesContainer city = {fakeCity}/>
        </Router>
      </Provider>,
    );
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(CityText)).toBeInTheDocument();
  });
});
