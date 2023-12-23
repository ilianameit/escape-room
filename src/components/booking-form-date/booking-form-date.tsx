import { DateBooking, dateBooking } from '../../const/const';
import { Slot } from '../../types/slot';
import { DateSlotBooking } from '../../types/slots-booking';

type BookingFormDateProps = {
  typeDate: keyof typeof DateBooking;
  slotsDate: Slot[];
  onSlotChange: (typeDate: keyof typeof DateBooking, slotDate: string) => void;
  slotChecked: DateSlotBooking;
}

function BookingFormDate({typeDate, slotsDate, onSlotChange, slotChecked}: BookingFormDateProps): JSX.Element {
  const isType = slotChecked.today.time ? 'today' : 'tomorrow';

  return(
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">{dateBooking[typeDate]}</legend>
      <div className="booking-form__date-inner-wrapper">
        {
          slotsDate.map(({time, isAvailable}) => (
            <label key={time} className="custom-radio booking-form__date">
              <input
                type="radio"
                id={`${typeDate}${time}`}
                name="date"
                required
                value={`${typeDate}${time}`}
                disabled={!isAvailable}
                onChange={() => onSlotChange(typeDate, time)}
                checked={typeDate === isType && time === slotChecked[isType].time && isAvailable}
              />
              <span className="custom-radio__label">{time}</span>
            </label>
          ))
        }
      </div>
    </fieldset>
  );
}

export default BookingFormDate;
