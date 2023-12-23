import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getBookingInfoQuest = (state: State) => state[NameSpace.Booking].bookingInfoQuest;
