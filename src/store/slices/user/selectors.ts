import { AuthorizationStatus, NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.User].user;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getAuthErrorStatus = (state: State) => state[NameSpace.User].loginStatus.rejected;
export const getAuthProcessStatus = (state: State) => state[NameSpace.User].loginStatus.pending;
