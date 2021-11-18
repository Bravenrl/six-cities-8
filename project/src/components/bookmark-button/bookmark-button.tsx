import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonClass } from '../../class-const';
import { AppRoute, AuthorizationStatus, PageType, TestID } from '../../const';
import { redirectToRoute } from '../../store/action';
import { postFavoriteAction } from '../../store/api-action';
import { getCurrentIsFavorite } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type BookmarkButtonProps = {
  isFavorite?: boolean;
  pageType?: PageType;
  id: number;
}

function BookmarkButton({ id, isFavorite, pageType }: BookmarkButtonProps): JSX.Element {
  const currentIsFavorite = useSelector(getCurrentIsFavorite);
  const authStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const btnIsFavorite = (pageType === PageType.Property) ? currentIsFavorite : isFavorite;
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
    setIsDisabled(false);
  }, [btnIsFavorite]);

  return (
    <button className={`${(pageType === PageType.Property) ? ButtonClass.Property.button : ButtonClass.Main.button}
    ${btnIsFavorite && `${(pageType === PageType.Property) ? ButtonClass.Property.active : ButtonClass.Main.active}`}
    button`}
    type="button"
    disabled={isDisabled}
    onClick={(evt) => {
      evt.preventDefault();
      if (authStatus !== AuthorizationStatus.Auth) {
        dispatch(redirectToRoute(AppRoute.Login));
      } else {
        dispatch(postFavoriteAction(+(!btnIsFavorite), `${id}`));
        setIsDisabled(true);
      }
    }}
    >
      <svg
        className={(pageType === PageType.Property) ? ButtonClass.Property.icon : ButtonClass.Main.icon}
        width={(pageType === PageType.Property) ? '31' : '18'}
        height={(pageType === PageType.Property) ? '33' : '19'}
        data-testid={TestID.ButtonSvg}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{btnIsFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
