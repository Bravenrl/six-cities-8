
import { ChangeEvent, FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { postCommentAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';
import { CommentType } from '../../types/review';
import { State } from '../../types/state';
import withPreloader from '../../hocs/with-preloader/with-preloader';

type CommentFormPropsType = {
}

type PropsFromReduxType = ConnectedProps<typeof connector>;
type ConnectedComponentPropsType = PropsFromReduxType & CommentFormPropsType;

const mapStateToPrors = ({ isDataLoading, currentOffer }: State) => ({
  currentOffer,
  isDataLoading,
});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(comment: string, rating: number, id: string) {
    dispatch(postCommentAction({ comment, rating } as CommentType, id));
  },
});

const connector = connect(mapStateToPrors, mapDispatchToProps);

function CommentForm(props: ConnectedComponentPropsType): JSX.Element {
  const { isDataLoading, currentOffer, onSubmit } = props;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const isButonDisable = !((comment.length >= 50 && comment.length <= 300 && +rating > 0));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(comment, +rating, currentOffer.id.toString());
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <fieldset disabled={isDataLoading}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating" onChange={(evt: ChangeEvent<HTMLInputElement>) => setRating(evt.target.value)}>
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
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
export default withPreloader(connector(CommentForm));
