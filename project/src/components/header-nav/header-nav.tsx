import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({ DATA, USER }: State) => ({
  email: DATA.userEmail,
  status: USER.authorizationStatus,
});
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});

type PropsFromReduxType = ConnectedProps<typeof connector>;


const connector = connect(mapStateToProps, mapDispatchToProps);

function HeaderNav(props: PropsFromReduxType): JSX.Element {
  const { email, onLogout, status } = props;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" href="#todo" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {(status === AuthorizationStatus.Auth) ? <span className="header__user-name user__name">{email}</span>
              : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {(status === AuthorizationStatus.Auth) &&
          <li className="header__nav-item">
            <a className="header__nav-link" href="#todo"
              onClick={(evt) => { evt.preventDefault(); onLogout(); }}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}

export { HeaderNav };
export default connector(HeaderNav);
