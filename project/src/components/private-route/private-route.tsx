
import { connect, ConnectedProps } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}
type PropsFromReduxType = ConnectedProps<typeof connector>;
type ConnectedComponentPropsType = PropsFromReduxType&PrivateRouteProps;

const mapStateToProps = ({USER}:State) => ({
  status: USER.authorizationStatus,
});

const connector = connect(mapStateToProps);

function PrivateRoute(props: ConnectedComponentPropsType): JSX.Element {
  const {exact, path, render, status} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        status === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);

