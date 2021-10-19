import { Link } from 'react-router-dom';
import { OfferType } from '../../types/offer';
import { AppRoute } from '../../const';
import PremiumMark from '../premium-mark/premium-mark';

type OfferCardPropType = {
  offer : OfferType;
  isMainPage : boolean;
  onOfferActive?: (id: number ) => void;
}

function OfferCard ({offer, isMainPage, onOfferActive} : OfferCardPropType) : JSX.Element {
  const {id, price, rating, title, type, isPremium, isFavorite, previewImage} = offer;
  const ratingPercent = Math.round(rating)*20;
  const typeCapital = type[0].toUpperCase()+type.slice(1);
  const pageName = isMainPage ? 'cities' : 'favorites';
  const linkPath = `${AppRoute.RoomProprety.slice(0, -3)}${id}`;

  return (
    <article
      onMouseEnter={(onOfferActive) ? ()=>{onOfferActive(id);} : undefined}
      onMouseLeave={(onOfferActive) ? ()=>{onOfferActive(0);} : undefined}
      className={`${pageName}__place-card place-card` } style={{marginTop: `${(!isMainPage)&&'10px'}` }}
    >
      {isPremium&&<PremiumMark className='place-card__mark'/>}
      <div className={`${pageName}__image-wrapper place-card__image-wrapper`}>
        <Link to = {linkPath}>
          <img className="place-card__image" src={previewImage} width={isMainPage?'260':'150'} height={isMainPage?'200':'110'} alt="Place"/>
        </Link>
      </div>
      <div className={`place-card__info ${(!isMainPage)&&'favorites__card-info'}`}>
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
