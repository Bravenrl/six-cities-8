import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { addComentRating } from '../../store/action';
import CommentStar from './comment-star';

const DISCRIPTION = 'perfect';
const ELEMENT = 5;

const mockStore = configureMockStore();

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    < CommentStar element={ELEMENT} discription={DISCRIPTION} />
  </Provider>);

describe('Component: CommentStar', () => {
  it('should render correctly & checked', () => {
    const state = {
      DATA: {
        commentRating: 5,
      },
    };
    const store = mockStore(state);
    renderComponent(store);
    expect(screen.getByRole('radio')).toBeChecked();
    expect(screen.getByTitle(DISCRIPTION)).toBeInTheDocument();
  });

  it('should render correctly & unchecked', () => {
    const state = {
      DATA: {
        commentRating: 4,
      },
    };
    const store = mockStore(state);
    renderComponent(store);
    expect(screen.getByRole('radio')).not.toBeChecked();
    expect(screen.getByTitle(DISCRIPTION)).toBeInTheDocument();
  });

  it('should dispatch addComentRating on click', () => {
    const state = {
      DATA: {
        commentRating: 4,
      },
    };
    const store = mockStore(state);
    renderComponent(store);
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    expect(store.getActions()).toEqual([]);
    fireEvent.click(radio);
    expect(store.getActions()).toEqual([addComentRating(ELEMENT)]);
    expect(screen.getByTitle(DISCRIPTION)).toBeInTheDocument();
  });
});
