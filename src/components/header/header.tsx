import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { checkAuthorizationStatus } from '../../utils/check-authorization-status/check-authorization-status';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const handleLogOutClick = () => {
    dispatch(logoutAction());
  };

  return(
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className='link not-disabled'
                to={AppRoutes.Main}
              >
                Квесты
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className='link' to={AppRoutes.Contacts}>
                  Контакты
              </NavLink>
            </li>
            {
              isLogged ? (
                <li className="main-nav__item">
                  <NavLink className='link' to={AppRoutes.MyQuests}>
                    Мои бронирования
                  </NavLink>
                </li>
              ) : false
            }

          </ul>
        </nav>
        <div className="header__side-nav">
          {
            isLogged ?
              <Link
                className="btn btn--accent header__side-item"
                to=''
                onClick={handleLogOutClick}
              >
                  Выйти
              </Link>
              : <Link className="btn header__side-item header__login-btn" to={AppRoutes.Login}>Вход</Link>
          }
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
