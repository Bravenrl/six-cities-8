import { useDispatch, useSelector } from 'react-redux';
import { PageType } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';
import { postFavoriteAction } from '../../store/api-action';
import { getIsPosting } from '../../store/app-process/selectors';
import { getCurrentIsFavorite } from '../../store/user-process/selectors';

type BookmarkButtonProps = {
  isFavorite?: boolean;
  pageType?: PageType;
  id: number;
}

function BookmarkButton({ id, isFavorite, pageType }: BookmarkButtonProps): JSX.Element {
  const isPosting = useSelector(getIsPosting);
  const currentIsFavorite = useSelector(getCurrentIsFavorite);
  const btnIsFavorite = isFavorite ?? currentIsFavorite;
  const dispatch = useDispatch();
  const name = (pageType === PageType.Property) ? 'property' : 'place-card';


  return (
    <button className={`${name}__bookmark-button ${btnIsFavorite && `${name}__bookmark-button--active`} button `}
      type="button"
      disabled={isPosting}
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(postFavoriteAction(+(!btnIsFavorite), `${id}`));
      }}
    >
      <svg className={`${name}__bookmark-icon`} width={(pageType === PageType.Property) ? '31' : '18'} height={(pageType === PageType.Property) ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{btnIsFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export { BookmarkButton };
export default withPreloader(BookmarkButton);
