import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComentRating } from '../../store/action';
import { getCommentRating } from '../../store/app-data/selectors';

type CommentStarPropsType = {
  element: number,
  discription: string,

}

function CommentStar({ element, discription }: CommentStarPropsType): JSX.Element {
  const rating = useSelector(getCommentRating);
  const dispatch = useDispatch();
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={element}
        id={`"${element}-stars"`} type="radio"
        checked={(element === rating)}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          dispatch(addComentRating(+evt.target.value))}
      />
      <label htmlFor={`"${element}-stars"`} className="reviews__rating-label form__rating-label" title={discription}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>

  );
}

export default CommentStar;
