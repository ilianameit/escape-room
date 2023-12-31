import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import BookingScreen from '../../pages/booking-screen/booking-screen';
import ContactsScreen from '../../pages/contacts-screen/contacts-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import MyQuestsScreen from '../../pages/my-quests-screen/my-quests-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import QuestScreen from '../../pages/quest-screen/quest-screen';
import { getToken } from '../../services/token';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction, fetchQuestsAction, fetchReservationQuestsAction } from '../../store/api-actions';
import { getErrorQuests, getQuestsLoading } from '../../store/slices/quests/selectors';
import LoadingScreen from '../../pages/loading.screen/loading-screen';
import ErrorQuestsScreen from '../../pages/error-quests-screen/error-quests-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { changeAuthorizationStatus } from '../../store/slices/user/user';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/slices/user/selectors';

function App(): JSX.Element {
  const token = getToken();
  const dispatch = useAppDispatch();

  if (token !== '') {
    dispatch(checkAuthAction());
  } else {
    dispatch(changeAuthorizationStatus());
  }

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isQuestsLoading = useAppSelector(getQuestsLoading);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    dispatch(fetchQuestsAction());
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchReservationQuestsAction());
    }
  }, [authorizationStatus, dispatch]);

  const hasErrorOffers = useAppSelector(getErrorQuests);

  if (!isAuthChecked || isQuestsLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasErrorOffers) {
    return (
      <ErrorQuestsScreen />);
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory} >
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainScreen />}/>
          <Route path={`${AppRoutes.Quest}:id`} element={<QuestScreen/>}/>
          <Route path={AppRoutes.Contacts} element={<ContactsScreen/>}/>
          <Route path={AppRoutes.Login} element={<LoginScreen/>}/>
          <Route path={`${AppRoutes.Quest}:id${AppRoutes.Booking}`} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <BookingScreen/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoutes.MyQuests} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyQuestsScreen/>
            </PrivateRoute>
          }
          />
          <Route path='*' element={<NotFoundScreen />} />

        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
