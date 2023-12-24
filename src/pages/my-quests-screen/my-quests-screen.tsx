import React, { memo, useCallback } from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import QuestList from '../../components/quest-list/quest-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBookingQuests } from '../../store/slices/reservation/selectors';
import EmptyReservationList from '../../components/empty-reservation-list/empty-reservation-list';
import { Reservation } from '../../types/reservation';
import { cancelReservation } from '../../store/slices/reservation/reservation';
import { fetchCancelReservedQuest } from '../../store/api-actions';


function MyQuestsScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const bookingQuests = useAppSelector(getBookingQuests);

  const handleCancelReserveClick = useCallback((id: Reservation['id']) => {
    dispatch(cancelReservation(id));
    dispatch(fetchCancelReservedQuest(id));
  }, [dispatch]);

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room: Мои бронирования</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
              <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
            </picture>
          </div>
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
            </div>
            {
              bookingQuests.length === 0 ? <EmptyReservationList /> :
                <QuestList reservations={bookingQuests} onCancelReserveClick={handleCancelReserveClick}/>
            }
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

const MyQuestsScreen = memo(MyQuestsScreenComponent);
export default MyQuestsScreen;
