import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestPreview } from '../types/quest-preview';
import { APIRoute, AppRoutes, NameSpace } from '../const/const';
import { Quest } from '../types/quest';
import { BookingInfo } from '../types/booking-info';
import { BookingQuest } from '../types/booking-quest';
import { redirectToRoute } from './actions';

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

export const fetchBookingInfoQuestAction = createAsyncThunk<
  BookingInfo[],
  Quest['id'],
  AsyncActionType
>(
  'reservation/fetchInfoBookingQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<BookingInfo[]>(`${APIRoute.Quest}/${id}${APIRoute.Booking}`);
    return data;
  },
);

export const fetchBookQuestAction = createAsyncThunk<
  BookingQuest,
  {
    id: Quest['id'];
    data: BookingQuest;
  },
  AsyncActionType
>(
  'reservation/fetchBookQuest',
  async (arg, { dispatch, extra: api }) => {
    const { data } = await api.post<BookingQuest>(`${APIRoute.Quest}/${arg.id}${APIRoute.Booking}`, arg.data);
    dispatch(redirectToRoute(AppRoutes.MyQuests));
    return data;
  },
);
