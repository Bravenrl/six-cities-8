import { ReviewType } from '../../types/review';
import { compareDate } from '../../utils';
import CommentForm from '../comment-form/comment-form';
import ReviewPost from '../property-review/property-review';

type ReviewsListType = {
  reviews: ReviewType[];
}

function ReviewsList ({reviews} : ReviewsListType) : JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {(reviews.length!==0)&&
        <ul className="reviews__list">
          {reviews.sort(compareDate).map((review)=>(<ReviewPost key={review.id} review={review}/>))}
        </ul>}
      <CommentForm />
    </section>
  );
}

export default ReviewsList;
