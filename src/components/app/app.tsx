import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoutes, currAuthorizationStatus } from '../../const/const';
import BookingScreen from '../../pages/booking-screen/booking-screen';
import ContactsScreen from '../../pages/contacts-screen/contacts-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import MyQuestsScreen from '../../pages/my-quests-screen/my-quests-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainScreen/>}/>
          <Route path={AppRoutes.Booking} element={<BookingScreen/>}/>
          <Route path={AppRoutes.Contacts} element={<ContactsScreen/>}/>
          <Route path={AppRoutes.Login} element={<LoginScreen/>}/>
          <Route path={AppRoutes.MyQuests} element={
            <PrivateRoute authorizationStatus={currAuthorizationStatus}>
              <MyQuestsScreen/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoutes.Quest} element={<LoginScreen/>}/>
          <Route path='*' element={<NotFoundScreen />} />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
