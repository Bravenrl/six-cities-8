import { OfferListClass } from '../../class-const';
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
      return OfferListClass.Main;
    case PageType.Favorites:
      return OfferListClass.Favorites;
    case PageType.Property:
      return OfferListClass.Property;
    default:
      return '';
  }
};

function OfferList({ offers, pageType }: OfferListProrsType): JSX.Element {

  return (
    <div className={getClassNameByType(pageType)}>
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.id}${pageType}`}
          offer={offer}
          pageType={pageType}
        />))}
    </div>
  );
}

export default OfferList;
