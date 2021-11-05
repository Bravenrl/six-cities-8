import { PageType } from '../../const';
import { OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers: OfferType[];
  pageType: PageType;
}

const getClassNameByType = (pageType: PageType): string => {
  switch (pageType) {
    case PageType.Main:
      return 'cities__places-list places__list tabs__content';
    case PageType.Favorites:
      return 'favorites__places';
    case PageType.Property:
      return 'near-places__list places__list';
    default:
      return '';
  }
};

function OfferList({ offers, pageType }: OfferListProrsType): JSX.Element {

  return (
    <div className={getClassNameByType(pageType)}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          pageType={pageType}
        />))}
    </div>
  );
}

export default OfferList;
