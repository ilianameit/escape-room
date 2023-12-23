import { Slot } from './slot';

export type SlotsBooking = {
  today: Slot[];
  tomorrow: Slot[];
}

export type DateSlotBooking = {
  today: Slot;
  tomorrow: Slot;
}

