type CommentStarPropsType = {
  element: number,
  rating: number,
  discription: string,

}

function CommentStar({element, rating, discription }: CommentStarPropsType): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={element} id={`"${element}-stars"`} type="radio" checked={(element===rating)}/>
      <label htmlFor={`"${element}-stars"`} className="reviews__rating-label form__rating-label" title={discription}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>

  );
}

export default CommentStar;
