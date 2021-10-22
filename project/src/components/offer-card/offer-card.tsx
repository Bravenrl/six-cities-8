import { generatePath, Link } from 'react-router-dom';
import { OfferType } from '../../types/offer';
import { AppRoute, PageType } from '../../const';
import PremiumMark from '../premium-mark/premium-mark';

type OfferCardPropType = {
  offer : OfferType;
  pageType : string;
  onOfferActive?: (id: number ) => void;
}
const getClassNameByType = (pageType:string) :string => {
  switch (pageType) {
    case PageType.Main:
      return 'cities__place-card place-card';
    case PageType.Favorites:
      return 'favorites__card place-card';
    case PageType.Property:
      return 'near-places__card place-card';
    default:
      return '';
  }
};

function OfferCard ({offer, pageType, onOfferActive} : OfferCardPropType) : JSX.Element {
  const {id, price, rating, title, type, isPremium, isFavorite, previewImage} = offer;
  const ratingPercent = Math.round(rating)*20;
  const typeCapital = type[0].toUpperCase()+type.slice(1);
  const linkPath = generatePath(AppRoute.RoomProprety, {id});

  return (
    <article
      onMouseEnter={(onOfferActive) ? ()=>{onOfferActive(id);} : undefined}
      onMouseLeave={(onOfferActive) ? ()=>{onOfferActive(0);} : undefined}
      className={getClassNameByType(pageType)} style={{marginTop: `${(pageType===PageType.Favorites)&&'10px'}` }}
    >
      {isPremium&&<PremiumMark className='place-card__mark'/>}
      <div className={`${pageType}__image-wrapper place-card__image-wrapper`}>
        <Link to = {linkPath}>
          <img className="place-card__image" src={previewImage} width={(pageType===PageType.Favorites)?'150':'260'} height={(pageType===PageType.Favorites)?'110':'200'} alt="Place"/>
        </Link>
      </div>
      <div className={`place-card__info ${(pageType===PageType.Favorites)&&'favorites__card-info'}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button  button ${isFavorite&&'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`  }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {linkPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{typeCapital}</p>
      </div>
    </article>);
}

export default OfferCard;
