import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestPreview } from '../types/quest-preview';
import { APIRoute, AppRoutes, NameSpace } from '../const/const';
import { Quest } from '../types/quest';
import { BookingInfo } from '../types/booking-info';
import { BookingQuest } from '../types/booking-quest';
import { redirectToRoute } from './actions';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { Reservation } from '../types/reservation';

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
  `${NameSpace.Booking}/fetchBookingInfoQuest`,
  async (id, { extra: api }) => {
    const { data } = await api.get<BookingInfo[]>(`${APIRoute.Quest}/${id}${APIRoute.Booking}`);
    return data;
  },
);

export const fetchBookQuestAction = createAsyncThunk<
  Reservation,
  {
    id: string;
    data: BookingQuest;
  },
  AsyncActionType
>(
  `${APIRoute.Booking}/fetchBookQuest`,
  async (arg, { dispatch, extra: api }) => {
    const { data } = await api.post<Reservation>(`${APIRoute.Quest}/${arg.id}${APIRoute.Booking}`, arg.data);
    dispatch(redirectToRoute(AppRoutes.Main));
    return data;
  },
);

export const fetchReservationQuestsAction = createAsyncThunk<
  Reservation[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Reservation}/fetchReservationQuests`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Reservation[]>(APIRoute.Reservation);
    return data;
  },
);

export const fetchCancelReservedQuest = createAsyncThunk<
  Reservation,
  Reservation['id'],
  AsyncActionType
>(
  `${NameSpace.Reservation}/fetchCancelReservedQuest`,
  async (id, { extra: api }) => {
    const { data } = await api.delete<Reservation>(`${APIRoute.Reservation}/${id}`);
    return data;
  },
);


export const checkAuthAction = createAsyncThunk<
  AuthData,
  undefined,
  AsyncActionType
>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<AuthData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<
  AuthData,
  UserData,
  AsyncActionType
  >(
    `${NameSpace.User}/login`,
    async ({email, password}, {extra: api}) => {
      const {data} = await api.post<AuthData>(APIRoute.Login, {email, password});
      const {token} = data;
      saveToken(token);

      return data;
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, AsyncActionType>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
