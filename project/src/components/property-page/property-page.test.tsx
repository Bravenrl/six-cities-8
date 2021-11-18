import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { cleanup, render, screen } from '@testing-library/react';
import { GenerateFakeOffer } from '../../mock/mock';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { AppRoute, TestReg } from '../../const';
import { loadPropertyOffersAction } from '../../store/api-action';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';
import PropertyPage from './property-page';
import ReactRouter from 'react-router';

jest.mock('../../store/api-action');
const fakeloadPropertyOffersAction = loadPropertyOffersAction as jest.MockedFunction<typeof loadPropertyOffersAction>;


const mockStore = configureMockStore();
const history = createMemoryHistory();

const ID = 5;
const componentState = {
  DATA: {
    ...MockDATA,
    currentOffer: { ...GenerateFakeOffer(), id: ID },
  },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    <Router history={history}>
      <PropertyPage />
    </Router>
  </Provider>);

describe('Component: PropertyPage', () => {
  const dispatch = jest.fn();
  const useDispatch = jest.spyOn(Redux, 'useDispatch');
  const useParams = jest.spyOn(ReactRouter, 'useParams');
  window.scrollTo = jest.fn();
  const store = mockStore(componentState);

  beforeEach(() => {
    history.push(`${AppRoute.RoomProprety}/${ID}`);
    useDispatch.mockReturnValue(dispatch);
    useParams.mockReturnValue({ id: `${ID}` });
  });

  afterEach(() => {
    useDispatch.mockClear();
    useParams.mockClear();
  });

  it('should render correctly and offer exist', () => {
    renderComponent(store);
    expect(screen.getByText(TestReg.ReviewsText)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PropertyPage)).toBeInTheDocument();
    expect(fakeloadPropertyOffersAction).toHaveBeenCalledWith(`${ID}`);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('should dispatch removeCurrentOffer when Component willUnmount', () => {
    useDispatch.mockReturnValue(dispatch);
    renderComponent(store);
    expect(fakeloadPropertyOffersAction).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    cleanup();
    expect(dispatch).toHaveBeenLastCalledWith({type: ActionType.RemoveCurrentOffer});
    useDispatch.mockClear();
  });
});

