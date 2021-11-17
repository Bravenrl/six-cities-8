import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import { logoutAction } from '../../store/api-action';
import { getUserEmail } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


function HeaderNav(): JSX.Element {
  const email = useSelector(getUserEmail);
  const authStatus = useSelector(getAuthorizationStatus);
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile"
            href="#todo"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {(authStatus === AuthorizationStatus.Auth)
              ? <span className="header__user-name user__name">{email}</span>
              : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {(authStatus === AuthorizationStatus.Auth) &&
          <li className="header__nav-item">
            <a className="header__nav-link" href="#todo"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
                if (location.pathname === AppRoute.Favorites) {
                  dispatch(redirectToRoute(AppRoute.Root));
                }
              }}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}

export { HeaderNav };
export default memo(HeaderNav);
