import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { getReviewsSortByDate } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { State } from '../../types/state';
import CommentForm from '../comment-form/comment-form';
import ReviewPost from '../property-review/property-review';

type ReviewsListType = {

}

type PropsFromReduxType = ConnectedProps<typeof connector>;
type ConnectedComponentPropsType = PropsFromReduxType & ReviewsListType;

const mapStateToPrors = (state: State) => ({
  authStatus: getAuthorizationStatus(state),
  sortedReviews: getReviewsSortByDate(state),
});

const connector = connect(mapStateToPrors);
function ReviewsList({ authStatus, sortedReviews }: ConnectedComponentPropsType): JSX.Element {
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
export { ReviewPost };
export default connector(ReviewsList);
