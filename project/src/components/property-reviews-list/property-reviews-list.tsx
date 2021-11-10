import { useSelector } from 'react-redux';
import { AuthorizationStatus, MAX_COMENT_VAL } from '../../const';
import { getReviewsSortByDate } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import CommentForm from '../comment-form/comment-form';
import ReviewPost from '../property-review/property-review';

function ReviewsList(): JSX.Element {
  const authStatus = useSelector(getAuthorizationStatus);
  const sortedReviews = useSelector(getReviewsSortByDate);
  if (sortedReviews.length>MAX_COMENT_VAL) {
    sortedReviews.length=MAX_COMENT_VAL;
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
      {(sortedReviews.length !== 0) &&
        <ul className="reviews__list">
          {sortedReviews.map((review) => (<ReviewPost key={review.id} review={review} />))}
        </ul>}
      {(authStatus === AuthorizationStatus.Auth) && <CommentForm />}
    </section>
  );
}

export default ReviewsList;
