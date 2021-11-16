import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, TestReg } from '../../const';
import { fakeReviews } from '../../mock/mock';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import ReviewsList from './property-reviews-list';

const mockStore = configureMockStore();

const componentState = {
  DATA: { ...MockDATA, reviews: fakeReviews },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => {
  render(
    <Provider store={store}>
      <ReviewsList />
    </Provider>);
};

describe('Component: ReviewsList', () => {
  it('should render correctly with noAuth status', () => {
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.ReviewsText)).toBeInTheDocument();
    expect(screen.getByText(`${fakeReviews.length}`)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(fakeReviews.length);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should render correctly with Auth status', () => {
    const authState = {
      ...componentState,
      USER: { ...MockUSER, authorizationStatus: AuthorizationStatus.Auth },
    };
    const store = mockStore(authState);
    renderComponent(store);
    expect(screen.getByText(TestReg.ReviewsText)).toBeInTheDocument();
    expect(screen.getByText(`${fakeReviews.length}`)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(fakeReviews.length);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should not render reviews', () => {
    const emptyState = {
      ...componentState,
      DATA: {...MockDATA},
    };
    const store = mockStore(emptyState);
    renderComponent(store);
    expect(screen.getByText(TestReg.ReviewsText)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});

