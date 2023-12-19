import { BookingPreview } from './booking-preview';
import { Location } from './location';
import { QuestPreview } from './quest-preview';

export type Booking = BookingPreview & {
  id: string;
  location: Location;
  quest: QuestPreview;
}
