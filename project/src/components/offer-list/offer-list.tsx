import { connect, ConnectedProps } from 'react-redux';
import { PageType } from '../../const';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';
import { getCurrentOffers } from '../../utils';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers : OfferType[];
  pageType: string;
  handleActiveOffer?: (id: number ) => void;
  city?: string;
}

type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & OfferListProrsType;

const mapStateToProps = ({sortType}: State) => ({
  sortType,
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

function OfferList ({offers, pageType, handleActiveOffer, city} : ConnectedComponentPropsType) : JSX.Element {
  const currentOffers = (city)?getCurrentOffers(offers, city):offers;
  return (
    <div className={getClassNameByType(pageType)}>
      {currentOffers.map((offer) => (<OfferCard onOfferActive = {handleActiveOffer} key={offer.id} offer = {offer}  pageType = {pageType}/>) )}
    </div>
  );
}

export default connector(OfferList);
