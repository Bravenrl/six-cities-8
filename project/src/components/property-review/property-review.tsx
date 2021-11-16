import { ReviewType } from '../../types/review';
import he from 'he';
import dayjs from 'dayjs';

type PropertyReviewType = {
  review: ReviewType
}

function PropertyReview({ review }: PropertyReviewType): JSX.Element {
  const { date, comment, rating, user } = review;
  const currentDate = dayjs(date).format('MMMM YYYY');
  const dateTime = dayjs(date).format('YYYY-MM-DD');
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {he.encode(comment)}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{currentDate}</time>
      </div>
    </li>
  );
}

export default PropertyReview;
