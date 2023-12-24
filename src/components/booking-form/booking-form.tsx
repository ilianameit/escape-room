import { useForm} from 'react-hook-form';
import { AppRoutes, DateBooking } from '../../const/const';
import { BookingInfo } from '../../types/booking-info';
import { Quest } from '../../types/quest';
import BookingFormDate from '../booking-form-date/booking-form-date';
import styles from './style.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBookQuestAction } from '../../store/api-actions';
import { ChangeEvent, useEffect, useState } from 'react';
import { BookingPreview } from '../../types/booking-preview';
import { DateSlotBooking } from '../../types/slots-booking';
import { useNavigate } from 'react-router-dom';
import ErrorSending from '../error-sending/error-sending';
import { getBookingQuestStatus, getErrorBookingQuestStatus, getSuccessfulBookingQuestStatus } from '../../store/slices/reservation/selectors';
import { resetStatus } from '../../store/slices/reservation/reservation';

type FormInputsType = {
  name: string;
  tel: string;
  person: number;
  children: boolean;
  'user-agreement': boolean;
}

type BookingFormProps = {
  quest: Quest;
  quests: BookingInfo[];
  selectedQuest?: BookingInfo;
}
function BookingForm({quest, quests, selectedQuest}: BookingFormProps):JSX.Element { //reserForm
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const [slot, setSlot] = useState<DateSlotBooking>({
    today: {time: '', isAvailable: true},
    tomorrow: {time: '', isAvailable: true},
  });
  const {today, tomorrow} = slot;
  const [contactPerson, setContactPerson] = useState<BookingPreview['contactPerson']>('');
  const [phone, setPhone] = useState<BookingPreview['phone']>('');
  const [withChildren, setWithChildren] = useState<BookingPreview['withChildren']>(false);
  const [peopleCount, setPeopleCount] = useState<BookingPreview['peopleCount']>(0);
  if (!selectedQuest) {
    selectedQuest = quests[0];
  }

  const isBookingQuest = useAppSelector(getBookingQuestStatus);
  const hasError = useAppSelector(getErrorBookingQuestStatus);
  const isSuccessfulStatus = useAppSelector(getSuccessfulBookingQuestStatus);

  const {slots} = selectedQuest;
  const { register, handleSubmit, formState: {
    errors,
    isValid
  } } = useForm<FormInputsType>({mode: 'onBlur'});

  const [minPeople, maxPeople] = quest.peopleMinMax;
  const regexPeopleCount = `^[${minPeople}-${maxPeople}]$`;

  const resetSlotsTime = () => {
    setSlot({
      today: { time: '', isAvailable: true },
      tomorrow: { time: '', isAvailable: true }
    });

  };

  useEffect(() => {
    resetSlotsTime();
  }, [selectedQuest]);

  const handleFormSubmit = () => {
    dispatch(fetchBookQuestAction({
      id: quest.id,
      data: {
        date:  today.time ? 'today' : 'tomorrow',
        time:   today.time ? today.time : tomorrow.time,
        contactPerson,
        phone,
        withChildren,
        peopleCount,
        placeId: selectedQuest?.id ?? quests[0].id
      }
    }));
  };

  if(isSuccessfulStatus) {
    dispatch(resetStatus());
    navigateTo(AppRoutes.MyQuests);
  }

  const handleSlotChange = (type: keyof typeof DateBooking, time: string) => {
    setSlot({
      ...slot,
      today: {time: '', isAvailable: true},
      tomorrow: {time: '', isAvailable: true},
      [type]: {time, isAvailable: true }
    });
  };

  const handleContactPersonChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setContactPerson(evt.target.value);
  };

  const handlePhoneChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPhone(evt.target.value);
  };

  const handleWithChildrenChange = () => {
    setWithChildren((preview) => !preview);
  };

  const handlePeopleCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPeopleCount(Number(evt.target.value));
  };

  return(
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={(evt) => void handleSubmit(handleFormSubmit)(evt)}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        {
          Object.entries(slots).map(([typeDate, slotsDate]) => (
            <BookingFormDate key={typeDate} typeDate={typeDate as keyof typeof DateBooking } slotsDate={slotsDate} onSlotChange={handleSlotChange} slotChecked={slot}/>
          ))
        }
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            {...register('name', {
              required: 'Укажите имя',
              pattern: {
                value: /[А-Яа-яЁёA-Za-z'-]{1,}/,
                message: 'Введите корректное имя'
              }
            })}
            onChange={handleContactPersonChange}
          />
          {errors.name && <span className={styles.alert}>{errors.name?.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            {...register('tel', {
              required: 'Укажите номер телефона',
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                message: 'Введите корректный номер'
              }
            })}
            onChange={handlePhoneChange}
          />
          {errors.tel && <span className={styles.alert}>{errors.tel?.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            {...register('person', {
              required: 'Укажите Количество участников',
              pattern: {
                value: new RegExp(regexPeopleCount),
                message: `Участие возможно от ${minPeople} до ${maxPeople} участников`
              }
            })}
            onChange={handlePeopleCountChange}
          />
          {errors.person && <span className={styles.alert}>{errors.person?.message}</span>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            {...register('children')}
            onChange={handleWithChildrenChange}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={!isValid || isBookingQuest}
      >
        { isBookingQuest ? 'Брованирование...' : 'Забронировать'}
      </button>
      {hasError && <ErrorSending />}
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input
          type="checkbox"
          id="id-order-agreement"
          {...register('user-agreement', {
            required: 'Ознакомьтесь с правилами'
          }
          )}
        />
        <span className={
          classNames(
            'custom-checkbox__icon',
            {[`${styles.alertCheckbox}`]: errors['user-agreement']}
          )
        }
        >
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
      &nbsp;и пользовательским соглашением
        </span>

        {errors['user-agreement'] && <span className={styles.alert}>{errors['user-agreement']?.message}</span>}
      </label>
    </form>
  );
}

export default BookingForm;
