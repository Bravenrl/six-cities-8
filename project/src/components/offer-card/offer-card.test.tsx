import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { OfferCardClass } from '../../class-const';
import { AppRoute, PageType, PROPERTY, TestReg } from '../../const';
import { GenerateFakeOffer } from '../../mock/mock';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { OfferCard } from './offer-card';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const componentState = {
  DATA: { ...MockDATA, currentOffer: GenerateFakeOffer() },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};
const store = mockStore(componentState);

const renderComponent = (pageType: PageType) => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.RoomProprety}>
            <h1>{PROPERTY}</h1>
          </Route>
          <Route >
            <OfferCard offer={componentState.DATA.currentOffer} pageType={pageType} />
          </Route>
        </Switch>
      </Router>
    </Provider>);
};

describe('Component: OfferCard', () => {
  it('should render correctly at Main page', () => {
    renderComponent(PageType.Main);
    expect(screen.getByRole('article')).toHaveClass(OfferCardClass.Main);
    expect(screen.getByAltText(TestReg.PlaceAltText)).toBeInTheDocument();
    expect(screen.getByText(componentState.DATA.currentOffer.title)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should render correctly at Property page', () => {
    renderComponent(PageType.Property);
    expect(screen.getByRole('article')).toHaveClass(OfferCardClass.Property);
  });
  it('should render correctly at Favorite page', () => {
    renderComponent(PageType.Favorites);
    expect(screen.getByRole('article')).toHaveClass(OfferCardClass.Favorites);
  });

  it('should redirect to /property when user clicked on link', () => {
    history.push(AppRoute.Root);
    renderComponent(PageType.Main);
    expect(screen.queryByText(TestReg.Property)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText(TestReg.PlaceAltText));
    expect(screen.getByText(TestReg.Property)).toBeInTheDocument();
    history.push(AppRoute.Root);
    expect(screen.queryByText(TestReg.Property)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(componentState.DATA.currentOffer.title));
    expect(screen.getByText(TestReg.Property)).toBeInTheDocument();
  });
  it('should dispatch om MouseEnter & MouseLeave', () => {
    history.push(AppRoute.Root);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    renderComponent(PageType.Favorites);

    userEvent.hover(screen.getByRole('article'));
    expect(dispatch).toBeCalledWith({
      payload: componentState.DATA.currentOffer.id,
      type: ActionType.SetCurrentId,
    });

    userEvent.unhover(screen.getByRole('article'));
    expect(dispatch).toBeCalledWith({
      payload: null,
      type: ActionType.SetCurrentId,
    });
  });

});
