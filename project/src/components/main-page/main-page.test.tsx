import { Provider } from 'react-redux';
import { fakeCity, offersFavoriteParis } from '../../mock/mock';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MainPage from './main-page';
import { MapClass } from '../../class-const';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { TestID, TestReg } from '../../const';

const CITY_WITHOUT_OFFERS = 'Amsterdam';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, offers: offersFavoriteParis },
  USER: { ...MockUSER, city: fakeCity },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    <Router history={history}>
      < MainPage />
    </Router>
  </Provider>);

describe('Component: MainPage', () => {
  it('should render correctly with offers > 0', () => {
    const store = mockStore(componentState);

    renderComponent(store);

    expect(screen.queryAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(TestReg.MainPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.MapSection)).toHaveClass(MapClass.Main);
  });

  it('should render correctly with offers = 0', () => {
    const witoutOffersState = { ...componentState, USER: { ...MockUSER, city: CITY_WITHOUT_OFFERS } };
    const store = mockStore(witoutOffersState);

    renderComponent(store);

    expect(screen.queryByAltText(TestReg.PlaceAltText)).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.MainPage)).toBeInTheDocument();
    expect(screen.queryByTestId(TestID.MapSection)).not.toBeInTheDocument();
  });

  it('should not render when isLoading', () => {
    const isLoadingState = { ...componentState, APP: { ...MockAPP, isLoading: true } };
    const store = mockStore(isLoadingState);

    renderComponent(store);

    expect(screen.queryByAltText(TestReg.PlaceAltText)).not.toBeInTheDocument();
    expect(screen.queryByText(TestReg.MainPage)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TestID.MapSection)).not.toBeInTheDocument();
  });
});
