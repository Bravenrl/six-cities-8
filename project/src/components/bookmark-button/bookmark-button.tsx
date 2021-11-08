import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageType } from '../../const';
import { postFavoriteAction } from '../../store/api-action';
import { getCurrentIsFavorite } from '../../store/app-data/selectors';

type BookmarkButtonProps = {
  isFavorite?: boolean;
  pageType?: PageType;
  id: number;
}

function BookmarkButton({ id, isFavorite, pageType }: BookmarkButtonProps): JSX.Element {
  const currentIsFavorite = useSelector(getCurrentIsFavorite);
  const dispatch = useDispatch();
  const btnIsFavorite = isFavorite ?? currentIsFavorite;
  const name = (pageType === PageType.Property) ? 'property' : 'place-card';
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
  }, [btnIsFavorite]);

  return (
    <button className={`${name}__bookmark-button ${btnIsFavorite && `${name}__bookmark-button--active`} button `}
      type="button"
      disabled={isDisabled}
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(postFavoriteAction(+(!btnIsFavorite), `${id}`));
        setIsDisabled(true);
      }}
    >
      <svg className={`${name}__bookmark-icon`} width={(pageType === PageType.Property) ? '31' : '18'} height={(pageType === PageType.Property) ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{btnIsFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
