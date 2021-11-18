import { Provider } from 'react-redux';
import { fakeCity, offersFavoriteParis } from '../../mock/mock';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MapClass } from '../../class-const';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { PageType, TestID} from '../../const';
import Map from './map';

const ID = 1;

const history = createMemoryHistory();
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA },
  USER: { ...MockUSER, currentID: ID },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore, pageType: PageType) => render(
  <Provider store={store}>
    <Router history={history}>
      < Map offers={offersFavoriteParis} pageType={pageType} city = {fakeCity} />
    </Router>
  </Provider>);

describe('Component: Map', () => {
  it('should render correctly at MainPage', () => {
    const store = mockStore(componentState);
    renderComponent(store, PageType.Main);
    expect(screen.getByTestId(TestID.MapSection)).toHaveClass(MapClass.Main);
  });

  it('should render correctly at PropertyPage', () => {
    const store = mockStore(componentState);
    renderComponent(store, PageType.Property);
    expect(screen.getByTestId(TestID.MapSection)).toHaveClass(MapClass.Property);
  });
});
