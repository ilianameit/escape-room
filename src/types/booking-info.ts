import { Location } from './location';
import { SlotsBooking } from './slots-booking';

export type BookingInfo = {
  id: string;
  location: Location;
  slots: SlotsBooking;
}
