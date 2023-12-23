import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { questsSlice } from './slices/quests/quests';
import { bookingSlice } from './slices/booking-quest/booking-quest';

export const rootReducer = combineReducers({
  [NameSpace.Quest]: questsSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
});
