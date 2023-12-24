import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getBookingInfoQuest = (state: State) => state[NameSpace.Reservation].bookingInfoQuest;

export const getBookingQuestStatus = (state: State) => state[NameSpace.Reservation].bookingStatus.pending;
export const getErrorBookingQuestStatus = (state: State) => state[NameSpace.Reservation].bookingStatus.rejected;
export const getSuccessfulBookingQuestStatus = (state: State) => state[NameSpace.Reservation].bookingStatus.fulfilled;

export const getBookingQuests = (state: State) => state[NameSpace.Reservation].bookingQuests;

export const getSuccessCancelReservationStatus = (state: State) => state[NameSpace.Reservation].successCancelReservation;
