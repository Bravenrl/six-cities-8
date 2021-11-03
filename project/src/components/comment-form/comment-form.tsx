
import { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCommentAction } from '../../store/api-action';

import withPreloader from '../../hocs/with-preloader/with-preloader';
import CommentStar from '../comment-star/comment-star';
import { Star } from '../../const';
import { addComent, addComentRating } from '../../store/action';
import { getComment, getCommentRating, getCurrentOffer } from '../../store/app-data/selectors';
import { getIsLoading } from '../../store/app-process/selectors';

function CommentForm(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const isLoading = useSelector(getIsLoading);
  const comment = useSelector(getComment);
  const rating = useSelector(getCommentRating);

  const dispatch = useDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction({ comment, rating }, currentOffer.id.toString()));
  };

  const isButonDisable = !((comment.length >= 50 && comment.length <= 300 && rating > 0));

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating"
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            dispatch(addComentRating(+evt.target.value))}
        >
          {[...Star.entries()].map(([element, discription]) => (
            <CommentStar
              key={element}
              rating={rating}
              element={element}
              discription={discription}
            />
          ))}
        </div>
        <textarea
          onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => dispatch(addComent(evt.target.value))}
          className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={isButonDisable}>Submit</button>
        </div>
      </fieldset>
    </form>
  );
}
export { CommentForm };
export default withPreloader(CommentForm);
