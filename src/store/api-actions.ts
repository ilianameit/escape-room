import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestPreview } from '../types/quest-preview';
import { APIRoute, NameSpace } from '../const/const';
import { Quest } from '../types/quest';

type AsyncActionType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchQuestsAction = createAsyncThunk<
  QuestPreview[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Quest}/fetchQuests`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<QuestPreview[]>(APIRoute.Quest);

    return data;
  }
);

export const fetchOneQuestAction = createAsyncThunk<
  Quest,
  Quest['id'],
  AsyncActionType
>(
  `${NameSpace.Quest}/fetchOneQuest`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Quest>(`${APIRoute.Quest}/${id}`);

    return data;
  }
);
