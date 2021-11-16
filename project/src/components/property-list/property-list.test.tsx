import { render, screen } from '@testing-library/react';
import { GenerateFakeOffer } from '../../mock/mock';
import PropertyList from './property-list';

const offer = GenerateFakeOffer();
const {id, goods} = offer;

describe('Component: PropertyList', () => {
  it('should render correctly at Property page', () => {
    render(<PropertyList goods={goods} id = {id}/>);
    expect(screen.queryAllByRole('listitem').length).toEqual(goods.length);
  });
});
