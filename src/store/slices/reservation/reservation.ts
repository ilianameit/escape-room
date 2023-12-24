import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';
import { fetchBookQuestAction, fetchBookingInfoQuestAction, fetchCancelReservedQuest, fetchReservationQuestsAction } from '../../api-actions';
import { Reservation } from '../../../types/reservation';
import { BookingInfo } from '../../../types/booking-info';

type QuestsStateType = {
  bookingInfoQuest: BookingInfo[];
  bookingStatus: {
    pending: boolean;
    rejected: boolean;
    fulfilled: boolean;
  };
  bookingQuests: Reservation[];
  successCancelReservation: boolean;
}

const initialState: QuestsStateType = {
  bookingInfoQuest: [],
  bookingStatus: {
    pending: false,
    rejected: false,
    fulfilled: false,
  },
  bookingQuests: [],
  successCancelReservation: false,
};

export const reservationSlice = createSlice({
  name: NameSpace.Reservation,
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.bookingStatus.fulfilled = false;
    },
    cancelReservation: (state, action: PayloadAction<Reservation['id']>) => {
      state.bookingQuests = state.bookingQuests.filter((quest) => quest.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingInfoQuestAction.fulfilled, (state, action) => {
        state.bookingInfoQuest = action.payload;
      })
      .addCase(fetchBookQuestAction.fulfilled, (state, action) => {
        state.bookingQuests.push(action.payload);
        state.bookingStatus.pending = false;
        state.bookingStatus.fulfilled = true;
      })
      .addCase(fetchBookQuestAction.rejected, (state) => {
        state.bookingStatus.rejected = true;
        state.bookingStatus.pending = false;
      })
      .addCase(fetchBookQuestAction.pending, (state) => {
        state.bookingStatus.pending = true;
      })
      .addCase(fetchReservationQuestsAction.fulfilled, (state, action) => {
        state.bookingQuests = action.payload;
      })
      .addCase(fetchCancelReservedQuest.fulfilled, (state) => {
        state.successCancelReservation = true;
      })
      .addCase(fetchCancelReservedQuest.rejected, (state) => {
        state.successCancelReservation = false;
      });
  },
});

export const { resetStatus, cancelReservation } = reservationSlice.actions;
