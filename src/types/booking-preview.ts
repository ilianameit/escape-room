import { DateBooking } from '../const/const';

export type BookingPreview = {
  date: keyof typeof DateBooking;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
}
