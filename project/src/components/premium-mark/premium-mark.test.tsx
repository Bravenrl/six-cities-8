import { render, screen } from '@testing-library/react';
import { PremiumMarkClass } from '../../class-const';
import { PageType, TestReg } from '../../const';
import PremiumMark from './premium-mark';

describe('Component: PremiumMark', () => {
  it('should render correctly at Property page', () => {
    render(<PremiumMark pageType={PageType.Property}/>);
    expect(screen.getByText(TestReg.PremiumMark).parentElement).toHaveClass(PremiumMarkClass.Property);
  });

  it('should render correctly at Main page', () => {
    render(<PremiumMark pageType={PageType.Main}/>);
    expect(screen.getByText(TestReg.PremiumMark).parentElement).toHaveClass(PremiumMarkClass.Main);
  });
});
