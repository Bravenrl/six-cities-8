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

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {
  USER: {
    city: INITIAL_CITY,
    sortType: SortType.Popular,
  },
};
const store = mockStore(state);


describe('Component: CityList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CityList />
        </Router>
      </Provider>,
    );
    CITIES.forEach((city) => expect(screen.getByText(city)).toBeInTheDocument());
    expect(screen.getByText(INITIAL_CITY).parentElement).toHaveClass(ITEM_ACTIVE);
    expect(screen.queryAllByRole('link').length).toBe(CITIES.length);
  });

  it('should dispatch changeCity and changeSorting', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CityList />
        </Router>
      </Provider>,
    );
    expect(store.getActions()).toEqual([]);
    userEvent.click(screen.getByText(CITIES[1]));
    expect(store.getActions()).toEqual([changeCity(CITIES[1]), changeSorting(SortType.Popular)]);
  });
});

