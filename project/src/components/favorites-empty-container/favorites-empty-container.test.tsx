import {render, screen} from '@testing-library/react';
import { TestReg } from '../../const';
import FavoritesEmptyContainer from './favorites-empty-container';


describe('Component: FavoritesEmptyContainer', () => {
  it('should render correctly', () => {
    render(< FavoritesEmptyContainer />);
    expect(screen.getByText(TestReg.FavoriteEmptyFirst)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FavoriteEmptySecond)).toBeInTheDocument();
  });
});
