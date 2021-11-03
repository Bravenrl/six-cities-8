import { connect, ConnectedProps } from 'react-redux';
import { PageType } from '../../const';
import { getSortedOffers } from '../../sorting';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';
import { getCurrentOffers } from '../../utils';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers : OfferType[];
  pageType: string;
  handleActiveOffer?: (id: number ) => void;
}

type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & OfferListProrsType;

const mapStateToProps = ({USER}: State) => ({
  sortType: USER.sortType,
  city: USER.city,
});


const connector = connect(mapStateToProps);

const getClassNameByType = (pageType:string) :string => {
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

function OfferList ({offers, pageType, handleActiveOffer, city, sortType} : ConnectedComponentPropsType) : JSX.Element {

  if (pageType===PageType.Main) {
    offers = getCurrentOffers(offers, city);
    offers = getSortedOffers(offers, sortType);
  }
  return (
    <div className={getClassNameByType(pageType)}>
      {offers.map((offer) => (<OfferCard onOfferActive = {handleActiveOffer} key={offer.id} offer = {offer}  pageType = {pageType}/>) )}
    </div>
  );
}

export default connector(OfferList);
