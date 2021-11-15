import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { addComentRating } from '../../store/action';
import CommentStar from './comment-star';


const discription = 'perfect';
const element = 5;
const mockStore = configureMockStore();

describe('Component: CommentStar', () => {
  it('should render correctly & checked', () => {
    const state = {
      DATA: {
        commentRating: 5,
      },
    };
    const store = mockStore(state);
    render(
      <Provider store={store}>
        < CommentStar element={element} discription={discription} />
      </Provider>);
    expect(screen.getByRole('radio')).toBeChecked();
    expect(screen.getByTitle(discription)).toBeInTheDocument();
  });

  it('should render correctly & unchecked', () => {
    const state = {
      DATA: {
        commentRating: 4,
      },
    };
    const store = mockStore(state);
    render(
      <Provider store={store}>
        < CommentStar element={element} discription={discription} />
      </Provider>);
    expect(screen.getByRole('radio')).not.toBeChecked();
    expect(screen.getByTitle(discription)).toBeInTheDocument();
  });

  it('should dispatch addComentRating on click', () => {
    const state = {
      DATA: {
        commentRating: 4,
      },
    };
    const store = mockStore(state);
    render(
      <Provider store={store}>
        < CommentStar element={element} discription={discription} />
      </Provider>);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    expect(store.getActions()).toEqual([]);
    fireEvent.click(radio);
    expect(store.getActions()).toEqual([addComentRating(element)]);
    expect(screen.getByTitle(discription)).toBeInTheDocument();
  });
});
