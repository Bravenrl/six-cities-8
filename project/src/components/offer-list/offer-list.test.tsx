import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { OfferListClass } from '../../class-const';
import { PageType, TestID, TestReg } from '../../const';
import { offersFavoriteParis } from '../../mock/mock';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import OfferList from './offer-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const componentState = {
  DATA: { ...MockDATA, offer: offersFavoriteParis },
  USER: { ...MockUSER, city: 'Paris' },
  APP: { ...MockAPP },
};

const store = mockStore(componentState);

const renderComponent = (pageType: PageType) => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <OfferList offers={componentState.DATA.offers} pageType={pageType} />
      </Router>
    </Provider>);
};

describe('Component: OfferList', () => {
  it('should render correctly at Main page', () => {
    renderComponent(PageType.Main);
    expect(screen.queryAllByAltText(TestReg.PlaceAltText).length).toEqual(componentState.DATA.offers.length);
    expect(screen.queryByTestId(TestID.OfferListDiv)).toHaveClass(OfferListClass.Main);
  });

  it('should render correctly at Property page', () => {
    renderComponent(PageType.Property);
    expect(screen.queryByTestId(TestID.OfferListDiv)).toHaveClass(OfferListClass.Property);
  });
  it('should render correctly at Favorite page', () => {
    renderComponent(PageType.Favorites);
    expect(screen.queryByTestId(TestID.OfferListDiv)).toHaveClass(OfferListClass.Favorites);
  });
});
