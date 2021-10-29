import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({ author, authorizationStatus }: State) => ({
  author,
  authorizationStatus,
});
const mapDispatchToProps = (dispath: ThunkAppDispatch) => ({
  onLogout() {
    dispath(logoutAction());
  },
});

type PropsFromReduxType = ConnectedProps<typeof connector>;


const connector = connect(mapStateToProps, mapDispatchToProps);

function HeaderNav(props: PropsFromReduxType): JSX.Element {
  const { author, onLogout, authorizationStatus } = props;
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" href="#todo" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {(authorizationStatus === AuthorizationStatus.Auth) ? <span className="header__user-name user__name">{author.email}</span>
              :<span className="header__login">Sign in</span>}
          </Link>
        </li>
        {(authorizationStatus === AuthorizationStatus.Auth) &&
            <li className="header__nav-item">
              <Link className="header__nav-link" href="#todo" to={AppRoute.Root}>
                <span className="header__signout" onClick={onLogout}>Sign out</span>
              </Link>
            </li>}
      </ul>
    </nav>
  );
}

export { HeaderNav };
export default connector(HeaderNav);
