import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TestReg } from '../../const';
import { MockAPP } from '../../mock/mockStore';
import Preloader from './preloader';

const mockStore = configureMockStore();

const renderComponent = (store: MockStore) => {
  render(
    <Provider store={store}>
      <Preloader />
    </Provider>);
};

describe('Component: Preloader', () => {
  it('should render correctly when loaging', () => {
    const componentState = {
      APP: { ...MockAPP, isLoading: true },
    };
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });

  it('should render correctly when posting', () => {
    const componentState = {
      APP: { ...MockAPP, isPosting: true },
    };
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });

  it('should not render', () => {
    const componentState = {
      APP: { ...MockAPP },
    };
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.queryByAltText(TestReg.Preloader)).not.toBeInTheDocument();
  });
});
