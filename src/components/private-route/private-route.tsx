import {Navigate, useLocation} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}
function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const {authorizationStatus, children} = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} state={{from: location}}/>
  );
}
export default PrivateRoute;
