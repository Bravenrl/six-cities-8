import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { AppRoute, AuthorizationStatus, PageType, TestID, TestReg } from '../../const';
import BookmarkButton from './bookmark-button';
import { ButtonClass } from '../../class-const';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { postFavoriteAction } from '../../store/api-action';
import { ActionType } from '../../types/action';

jest.mock('../../store/api-action');

const fakePostFavoriteAction = postFavoriteAction as jest.MockedFunction<typeof postFavoriteAction>;

const mockStore = configureMockStore();

const history = createMemoryHistory();
const componentState = {
  DATA: {
    ...MockDATA,
    currentIsFavorite: true,
  },
  USER: {
    ...MockUSER,
    authorizationStatus: AuthorizationStatus.Auth,
  },
  APP: { ...MockAPP },
};
const id = 1;
const favoriteTruthly = true;
const favoriteFalsy = false;
const falseValue = 0;

const renderComponent = (store: MockStore, isFavorite?: boolean, pageType?: PageType) => render(
  <Provider store={store}>
    <Router history={history}>
      <BookmarkButton id={id} pageType={pageType} isFavorite={isFavorite} />
    </Router>
  </Provider>,
);

describe('Component: BookmarkButton', () => {
  it('should render correctly on Main Page & favorite=true', () => {
    const store = mockStore(componentState);
    renderComponent(store, favoriteTruthly, PageType.Main);
    expect(screen.getByRole('button')).toHaveClass(`${ButtonClass.Main.button} ${ButtonClass.Main.active}`);
    expect(screen.getByTestId(TestID.ButtonSvg)).toHaveClass(ButtonClass.Main.icon);
    expect(screen.getByText(TestReg.ButtonIsFavorite)).toBeInTheDocument();
  });

  it('should render correctly on Main Page & favorite=false', () => {
    const store = mockStore(componentState);
    renderComponent(store, favoriteFalsy, PageType.Main);
    expect(screen.getByRole('button')).toHaveClass(ButtonClass.Main.button);
    expect(screen.getByRole('button')).not.toHaveClass(ButtonClass.Main.active);
    expect(screen.getByTestId(TestID.ButtonSvg)).toHaveClass(ButtonClass.Main.icon);
    expect(screen.getByText(TestReg.ButtonNonFavorite)).toBeInTheDocument();
  });

  it('should render correctly on Property & favorite=true', () => {
    const store = mockStore(componentState);
    renderComponent(store, favoriteFalsy, PageType.Property);
    expect(screen.getByRole('button')).toHaveClass(`${ButtonClass.Property.button} ${ButtonClass.Property.active}`);
    expect(screen.getByTestId(TestID.ButtonSvg)).toHaveClass(ButtonClass.Property.icon);
    expect(screen.getByText(TestReg.ButtonIsFavorite)).toBeInTheDocument();
  });

  it('should dispatch redirect when user clicked and Auth', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    useDispatch.mockClear();
    renderComponent(store, favoriteTruthly, PageType.Main);
    expect(screen.getByRole('button')).toBeEnabled();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    expect(dispatch).toHaveBeenCalled();
  });


  it('should dispatch PostFavoriteAction when user clicked, Auth and favorite=true', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store, favoriteTruthly, PageType.Main);
    expect(screen.getByRole('button')).toBeEnabled();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fakePostFavoriteAction).toHaveBeenCalledWith(falseValue, `${id}`);
    useDispatch.mockClear();
  });


  it('should dispatch redirect when user clicked and NonAuth', () => {
    const nonAuthState = {
      ...componentState,
      USER: {
        ...MockUSER,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(nonAuthState);
    renderComponent(store, favoriteTruthly, PageType.Main);
    expect(screen.getByRole('button')).toBeEnabled();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(dispatch).toHaveBeenCalledWith({payload: AppRoute.Login, type: ActionType.RedirectToRoute});
    useDispatch.mockClear();
  });
});
