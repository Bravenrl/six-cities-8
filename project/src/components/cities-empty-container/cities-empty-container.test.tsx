import {render, screen} from '@testing-library/react';
import CitiesEmptyContainer from './cities-empty-container';

describe('Component: CitiesEmptyContainer', () => {
  it('should render correctly', () => {
    const city = 'city';
    render(< CitiesEmptyContainer city={city} />);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
