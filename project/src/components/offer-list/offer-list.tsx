import { connect, ConnectedProps } from 'react-redux';
import { PageType } from '../../const';
import { getSortedOffers } from '../../store/app-data/selectors';
import { getCity, getSortType } from '../../store/user-process/selectors';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers: OfferType[];
  pageType: string;
  handleActiveOffer?: (id: number) => void;
}

type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & OfferListProrsType;

const mapStateToProps = (state: State) => ({
  sortType: getSortType(state),
  city: getCity(state),
  sortedOffers: getSortedOffers(state),
});


const connector = connect(mapStateToProps);

const getClassNameByType = (pageType: string): string => {
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

function OfferList({ offers, pageType, handleActiveOffer, city, sortType, sortedOffers }: ConnectedComponentPropsType): JSX.Element {

  return (
    <div className={getClassNameByType(pageType)}>
      {((pageType === PageType.Main) ? sortedOffers : offers)
        .map((offer) => (
          <OfferCard
            onOfferActive={handleActiveOffer}
            key={offer.id}
            offer={offer}
            pageType={pageType}
          />))}
    </div>
  );
}

export default connector(OfferList);
