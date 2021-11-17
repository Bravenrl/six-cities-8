import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


type PrivateRouteProps = RouteProps;

function PrivateRouteLogin(props: PrivateRouteProps): JSX.Element {
  const authStatus = useSelector(getAuthorizationStatus);
  return (authStatus === AuthorizationStatus.Auth)
    ? <Redirect to={AppRoute.Root} />
    : <Route {...props} />;
}

export default PrivateRouteLogin;
