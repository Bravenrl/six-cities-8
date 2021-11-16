import { render, screen } from '@testing-library/react';
import { TestReg } from '../../const';
import { GenerateFakeReview } from '../../mock/mock';
import PropertyReview from './property-review';

const review = GenerateFakeReview();
const { comment, user } = review;

describe('Component: ReviewPost', () => {
  it('should render correctly', () => {
    render(<PropertyReview review={review}/>);
    expect(screen.getByAltText(TestReg.AvatarAltText)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(TestReg.RatingText)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
