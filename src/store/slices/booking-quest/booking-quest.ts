import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../const/const';
import { fetchBookQuestAction, fetchBookingInfoQuestAction } from '../../api-actions';

import { BookingInfo } from '../../../types/booking-info';
import { BookingQuest } from '../../../types/booking-quest';

type QuestsStateType = {
  bookingInfoQuest: BookingInfo[];
  bookingQuests: BookingQuest[];
}

const initialState: QuestsStateType = {
  bookingInfoQuest: [],
  bookingQuests: [],
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingInfoQuestAction.fulfilled, (state, action) => {
        state.bookingInfoQuest = action.payload;
      })
      .addCase(fetchBookQuestAction.fulfilled, (state, action) => {
        state.bookingQuests.push(action.payload);
      });
  },
});

