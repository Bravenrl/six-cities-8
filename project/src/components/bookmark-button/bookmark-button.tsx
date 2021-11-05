import { PageType } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';

type BookmarkButtonProps = {
  isFavorite: boolean;
  pageType?: PageType;
}

function BookmarkButton({ isFavorite, pageType }: BookmarkButtonProps): JSX.Element {
  const name = (pageType === PageType.Property)? 'property' : 'place-card';
  return (
    <button className={`${name}__bookmark-button ${isFavorite && `${name}__bookmark-button--active`} button `} type="button">
      <svg className={`${name}__bookmark-icon`} width={(pageType === PageType.Property) ? '31' : '18'} height={(pageType === PageType.Property) ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export {BookmarkButton};
export default withPreloader(BookmarkButton);
