import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { questsSlice } from './slices/quests/quests';
import { userSlice } from './slices/user/user';
import { reservationSlice } from './slices/reservation/reservation';

export const rootReducer = combineReducers({
  [NameSpace.Quest]: questsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Reservation]: reservationSlice.reducer,
});
