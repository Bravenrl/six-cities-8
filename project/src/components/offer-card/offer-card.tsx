import { generatePath, Link } from 'react-router-dom';
import { OfferType } from '../../types/offer';
import { AppRoute, PageType } from '../../const';
import PremiumMark from '../premium-mark/premium-mark';
import { getWithCapitalLetter } from '../../utils';
import { useDispatch } from 'react-redux';
import { setCurrentId } from '../../store/action';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { memo } from 'react';

type OfferCardPropType = {
  offer: OfferType;
  pageType: PageType;
}

const getClassNameByType = (pageType: PageType): string => {
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

function OfferCard({ offer, pageType }: OfferCardPropType): JSX.Element {
  const { id, price, rating, title, type, isPremium, isFavorite, previewImage } = offer;
  const ratingPercent = Math.round(rating) * 20;
  const linkPath = generatePath(AppRoute.RoomProprety, { id });
  const dispatch = useDispatch();
  return (
    <article
      onMouseEnter={() => dispatch(setCurrentId(id))}
      onMouseLeave={() => dispatch(setCurrentId(null))}
      onClick={() => dispatch(setCurrentId(null))}
      className={getClassNameByType(pageType)} style={{ marginTop: `${(pageType === PageType.Favorites) && '10px'}` }}
    >
      {isPremium && <PremiumMark className='place-card__mark' />}
      <div className={`${pageType}__image-wrapper place-card__image-wrapper`}>
        <Link to={linkPath}>
          <img className="place-card__image" src={previewImage} width={(pageType === PageType.Favorites) ? '150' : '260'} height={(pageType === PageType.Favorites) ? '110' : '200'} alt="Place" />
        </Link>
      </div>
      <div className={`place-card__info ${(pageType === PageType.Favorites) && 'favorites__card-info'}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton id={id} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{getWithCapitalLetter(type)}</p>
      </div>
    </article>);
}

export default memo(OfferCard);
