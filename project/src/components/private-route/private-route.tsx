
import { connect, ConnectedProps } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}
type PropsFromReduxType = ConnectedProps<typeof connector>;
type ConnectedComponentPropsType = PropsFromReduxType&PrivateRouteProps;

const mapStateToProps = (state:State) => ({
  authStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

function PrivateRoute(props: ConnectedComponentPropsType): JSX.Element {
  const {exact, path, render, authStatus} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);

