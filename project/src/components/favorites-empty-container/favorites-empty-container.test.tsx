import {render, screen} from '@testing-library/react';
import FavoritesEmptyContainer from './favorites-empty-container';


describe('Component: FavoritesEmptyContainer', () => {
  it('should render correctly', () => {
    render(< FavoritesEmptyContainer />);
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down/i)).toBeInTheDocument();
  });
});
