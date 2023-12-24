import React, { useEffect, useState } from 'react';
import SvgHidden from '../../components/svg-hidden/svg-hidden';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBookingInfoQuestAction, fetchOneQuestAction } from '../../store/api-actions';
import { dropQuest } from '../../store/slices/quests/quests';
import { getOneQuest, getOneQuestLoading } from '../../store/slices/quests/selectors';
import LoadingScreen from '../loading.screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Map from '../../components/map/map';
import { BookingInfo } from '../../types/booking-info';

import BookingForm from '../../components/booking-form/booking-form';
import { getBookingInfoQuest } from '../../store/slices/reservation/selectors';

function BookingScreen():JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();


  useEffect(() => {
    if(!id) {
      return;
    }

    dispatch(fetchOneQuestAction(id));
    dispatch(fetchBookingInfoQuestAction(id));

    return () => {
      dispatch(dropQuest());
    };
  }, [dispatch, id]);

  const quest = useAppSelector(getOneQuest);
  const isLoading = useAppSelector(getOneQuestLoading);
  const bookingInfoQuests = useAppSelector(getBookingInfoQuest);

  const [bookingQuest, setBookingQuest] = useState<BookingInfo | undefined>(undefined);

  const handleMarkerClick = (currentQuest: BookingInfo) => {
    setBookingQuest(currentQuest);
  };

  if(bookingInfoQuests.length === 0 || !quest && isLoading) {
    return <LoadingScreen />;
  }
  if(!quest || !id) {
    return <NotFoundScreen />;
  }

  const {title, coverImg, coverImgWebp} = quest;

  return(
    <React.Fragment>
      <Helmet>
        <title>Escape Room: Бронирование</title>
      </Helmet>
      <SvgHidden />
      <div className="wrapper">
        <Header />
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
              />
              <img
                src={coverImg}
                srcSet={`${coverImg} 2x`}
                width={1366}
                height={1959}
                alt={title}
              />
            </picture>
          </div>
          <div className="container container--size-s">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
              </h1>
              <p className="title title--size-m title--uppercase page-content__title">{title}</p>
            </div>
            <div className="page-content__item">
              <Map block='booking' location={bookingQuest?.location || bookingInfoQuests[0].location} quests={bookingInfoQuests} selectedQuest={true && bookingQuest || bookingInfoQuests[0]} onMarkerClick={handleMarkerClick}/>
            </div>
            <BookingForm quest={quest} quests={bookingInfoQuests} selectedQuest={bookingQuest} />
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default BookingScreen;
