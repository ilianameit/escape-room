import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { questsSlice } from './slices/quests/quests';

export const rootReducer = combineReducers({
  [NameSpace.Quest]: questsSlice.reducer,
});
