import { AuthorizationStatus } from '../../const/const';

export const checkAuthorizationStatus = (status: AuthorizationStatus): boolean => status === AuthorizationStatus.Auth;
