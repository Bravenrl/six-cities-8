import { render, screen } from '@testing-library/react';
import { TestReg } from '../../const';
import { GenerateFakeOffer } from '../../mock/mock';
import GalleryList from './property-gallery';

const offer = GenerateFakeOffer();
const {id, images} = offer;

describe('Component: GalleryList', () => {
  it('should render correctly at Property page', () => {
    render(<GalleryList images={images} id = {id}/>);
    expect(screen.queryAllByAltText(TestReg.ImgAltText).length).toEqual(images.length);
  });
});
