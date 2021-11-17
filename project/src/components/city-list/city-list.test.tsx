import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { CITIES } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { INITIAL_CITY, SortType } from '../../const';
import userEvent from '@testing-library/user-event';
import { changeCity, changeSorting } from '../../store/action';
import { CityList } from './city-list';

const ITEM_ACTIVE = 'tabs__item--active';
const NEW_CITY = CITIES[1];

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {
  USER: {
    city: INITIAL_CITY,
    sortType: SortType.Popular,
  },
};
const store = mockStore(state);

const renderComponent = () => render(
  <Provider store={store}>
    <Router history={history}>
      <CityList />
    </Router>
  </Provider>,
);

describe('Component: CityList', () => {
  it('should render correctly', () => {
    renderComponent();
    CITIES.forEach((city) => expect(screen.getByText(city)).toBeInTheDocument());
    expect(screen.getByText(INITIAL_CITY).parentElement).toHaveClass(ITEM_ACTIVE);
    expect(screen.queryAllByRole('link').length).toBe(CITIES.length);
  });

  it('should dispatch changeCity and changeSorting', () => {
    renderComponent();
    expect(store.getActions()).toEqual([]);
    userEvent.click(screen.getByText(NEW_CITY));
    expect(store.getActions()).toEqual([changeCity(NEW_CITY), changeSorting(SortType.Popular)]);
  });
});

